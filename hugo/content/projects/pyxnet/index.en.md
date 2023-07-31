---
title: "Pyxnet - Virtual network topology in python"
date: 2023-06-05T00:00:00+00:00
cover_source: https://unsplash.com/fr/photos/40XgDxBfYXM
github_link: "https://github.com/fdmysterious/pyxnet"
---

# Intoduction

`Pyxnet` is a python (py) library targetted at creating virtual networks (net) using SDN (Software Defined Networking) technology. The `x` in the
name is for the crossover thing.
Its main application is for testing software behaviour in a given environment, or external devices
like embedded devices. This tool is structured in such a way that it is simple to integrate in
automated test environments, and that created network topologies are easy to export in
documentation.

{{< figure src="pyxnet_goals.png" title="Pyxnet goals" >}}

# Installation

You can install this package via `pip`:

```bash
pip install git+https://github.com/fdmysterious/pyxnet
```

# Dependencies

This library depends on the following elements:

- Linux only
- [openvswitch](https://www.openvswitch.org/) must be installed, and the following commands must be available:
    - `ovs-vsctl`
    - `ovs-dpctl`
    - `ovs-ofctl`
- iproute inerface is made using the [pyroute2](https://pyroute2.org/) library;
- [graphviz](https://github.com/xflr6/graphviz) allows graph generation.

# Defining a network topology

## General principles

A network topology is defined using the following elements:

- Topology objects;
- Links between objects' endpoints.

For instance, let's take the following topology:

{{< figure src="example_topology.png" title="Example topology (examples/basic_topology.py)" >}}

Topology objects are the four switches `s1`, `s2`, `s3` and `s4`, each switch
have two endpoints `p0` and `p1`. Each link is symbolized by a solid line on the graph.

The python code generating this topology is fairly straightforward:

```python
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # First, declare a topology object. This object will holds all objects declaration,
    # as well as links between these objects.
    tt = Topology(name="Basic topology")

    # Secondly, we declare the objects we will have in our topology.
    s1 = tt.register(MyCustomSwitch("s1", mac_addr="02:01:02:00:00:01", ip_addr="10.0.0.1/24"), group="group1")
    s2 = tt.register(MyCustomSwitch("s2", mac_addr="02:01:02:00:00:02", ip_addr="10.0.0.2/24"), group="group1")
    s3 = tt.register(MyCustomSwitch("s3", mac_addr="02:01:02:00:00:03", ip_addr="10.0.0.3/24"), group="group2")
    s4 = tt.register(MyCustomSwitch("s4", mac_addr="02:01:02:00:00:04", ip_addr="10.0.0.4/24"), group="group2")


    # Then, we connect these objects together
    tt.connect(s1.p0, s3.p0)
    tt.connect(s1.p1, s4.p0)
    tt.connect(s2.p0, s3.p1)
    tt.connect(s2.p1, s4.p1)

    # Then, we can export our graph
    dot = tt.export_graphviz()
    dot.render("output_graph")

    # Now, onto instanciation of our topology!
    cleanup_all()    # Precaution
    tt.instanciate() # Topology instanciation on host platform

    # Up objects
    s1.up()
    s2.up()
    s3.up()
    s4.up()
```

This example is available in the `examples/basic_topology.py` file. We can
see here that after the toplogy object is created, the toplogy is defined by
registering objects into our toplogy, then linking them together. Objects can
be grouped in logical groups for easier representation.

## Endpoint types

Each toplogy object defines endpoints, which are the points that can be linked
together in order to define how objects are linked together. This corresponds for instance
to a switch's port. Each endpoint can have the following type:

- `Virtual`: the endpoint exists in the *virtual world*, *e.g.* inside the host machine;
- `Real`: the endpoint exists in the real world, *e.g.* outside the host machine;
- `Phy`: the endpoint is an interface on the host machine, *e.g.* a usb/phy dongle, or a port on an ethernet card.

This type definition implies the following statements:

- All the network topology can be defined using `virtual` and `real` objects;
- A virtual endpoint cannot be linked directly to a real endpoint. **There mst be** a phy interface in-between.

{{< figure src="real_objects.png" title="Real and virtual objects (examples/real_objects.py)" >}}

As specified, the user is relieved of concerns regarding implementation
details, the necessity of defining specific objects, and whether they need to
be instantiated on the Linux machine or not. This approach ensures that the
generated graph comprehensively represents the tested topology.

On the above figure, existing links in the virtual world are represented
using solid lines, whereas real world ones are represented using dashed lines.
This means that when instanciating, real links have no real effect on what's happening
inside the linux host.

# Defining a custom object

Defining a custom object is straightforward, as it is classed based. Here is an example
of how to define a custom switch with two ports:

```python
class MyCustomSwitch(Switch):
    """
    This class illustrates how a custom network object can be created
    by simply inheriting base objects
    """

    def __init__(self, name: str, mac_addr: str = None, ip_addr: str = None):
        # Each topology object has a name
        super().__init__(name,
            mac_addr   = mac_addr, # Not mandatory
            ip_addr    = ip_addr,  # Not mandatory

            stp_config = {
                "rstp_enabled": True,     # Enable RSTP!
                "bridge_priority": 0x8000 # Set bridge priority
            }
        )

        # Init endpoints
        self.p0 = self._endpoint_register("p0", Endpoint_Kind.Virtual)
        self.p1 = self._endpoint_register("p1", Endpoint_Kind.Virtual)

        # Set endpoint RSTP properties
        self.p0.properties["stp_config"] = {
            "path_cost": 100,
            "priority":  0x8000,
        }

        self.p1.properties["stp_config"] = {
            "path_cost": 100,
            "priority": 0x8000,
        }


    def export_graphviz(self, dot):
        """
        Illustrate how it's possible to customize
        the diagram generated object
        """

        dghelpers.box_logo_node(dot, self.name, dghelpers.asset("icons/material/router.png"), f"Switch {self.name}")
```

Key elements here are:

- Each network object has an unique name;
- the `export_graphviz()` method exports the object on a graphviz diagram. The [google material](https://github.com/google/material-design-icons)
  is included in this package.

To define a network object from scratch, you can derive the `PyxNetObject` class. The following methods can be defined:

- `instanciate(self)`: implements how the object is instanciated on the linux platform;
- `remove(self)`: implements how the object is removed from the linux platform;
- `up(self)`: implements how the object is bring up on the the linux platform;
- `down(self)`: implements how the object is bring down on the linux platform;
- `export_graphviz(self,dot)`: implements how the object is represented on a graphviz diagram.

# Roadmap

Here are some planned features:

- [ ] Possibility of easily integrating third-party software, such as a tftp server, using iproute's `namespace`;
- [ ] Similarly, possibility to connect to docker containers and networks.
