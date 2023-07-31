---
title: "Pyxnet - Gestion de topologie réseau virtuelle en python"
date: 2023-06-05T00:00:00+00:00
cover_source: "https://unsplash.com/fr/photos/40XgDxBfYXM"
github_link: "https://github.com/fdmysterious/pyxnet"
---

# Introduction

Pyxnet est une bibliothèque python (py), destinée à la création de réseaux virtuels (net) via l'utilisation
des technologies du SDN (Software-Defined Networking). Le `x` dans le nom est juste présent pour l'aspect
croisé entre les deux technologies. Son usage est principalement destiné au test de logiciels dans un environnement
réseau défini, ou plus particulièrement dans le cas de périphériques externes contenant des logiciels embarqués.
L'outil est structuré de sorte à s'intégrer facilement dans des environnements de test automatisé, et les topologies
définies peuvent facilement s'exporter dans des documentations.

{{< figure src="pyxnet_goals.png" title="Objectifs de Pyxnet" >}}

# Installation

Le paquet est installable via `pip` :

```bash
pip install git+https://github.com/fdmysterious/pyxnet
```

# Dépendances

Les dépendances du projet sont les suivantes :

- L'outil cible une plateforme linux
- [openvswitch](https://www.openvswitch.org/) fournit un certain nombre d'éléments de contrôle du SDN. Les commandes suivantes doivent-être disponibles :
    - `ovs-vsctl`
    - `ovs-dpctl`
    - `ovs-ofctl`
- L'interface via les mécanismes IP de linux sont assurés par la bibliothèque [`pyroute2`](https://pypi.org/project/pyroute2/)

# Définir une topologie réseau

## Principes généraux

Une topologie réseau virtuelle est définie dans `pyxnet` au moyen de deux éléments :

- Les objets de la topologie
- Les liens entre les *endpoints* de la topologie.

Par exemple, prenons la topologie suivante :

{{< figure src="example_topology.png" title="Topologie d'exemple (examples/basic_topology.py)" >}}

Les objets de la topologie sont les quatre switches `s1`, `s2`, `s3` et `s4`. Chaque switch possède deux *endpoint*s, `p0` et `p1`, et leurs
liens sont symbolisés par les lignes sur le graphe.

Le code python permettant de générer cette topologie est assez direct :

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

Cet exemple est disponible dans le fichier `examples/basic_topology.py`. Une fois que l'objet représentant la topologie est créé,
les éléments constituant la topologie sont instanciés, puis liés entre eux. Ils peuvent-être regroupés dans des groupes virtuels pour
une représentation plus claire.

## Type de Endpoints

Chaque objet de la topologie définit des *endpoints*, qui sont les points d'arrivées pouvant être
reliés entre eux. Par exemple, un *endpoint* peut correspondre au port d'un switch.
Chaque *endpoint* peut avoir le type suivant :

- `Virtual` : l'endpoint existe dans le monde virtuel, *e.g.* dans la machine hôte ;
- `Real` : l'endpoint existe dans le monde réel, *e.g.* en dehors de la machine hôte ;
- `Phy` : l'endpoint est une interface entre un endpoint réel et virtuel, *e.g.* un dongle usb/phy, ou bien un port sur une carte ethernet.

Ce type de définition implique les prédicats suivants :

- Toute la topologie réseau peut-être définie par des objets *virtuels* et *réels* ;
- Un endpoint *virtuel* **ne peut pas être relié directement** vers un endpoint *réel*.
  **Il est nécessaire** d'avoir une interface *phy* entre les deux.

{{< figure src="real_objects.png" title="Objets réels et virtuels (examples/real_objects.py)" >}}

Tel que défini, l'utilisateur n'a pas à ce soucier des détails d'implémentation, et quels objets doivent-être
définis ou non. Cela rend le graph exhaustif vis à vis de la topologie testée.

Sur la figure ci-dessus, les liens existants dans le monde virtuels sont représentés
par des lignes solides, alors que les liens dans le monde réels sont en pointillés.
Cela signifie que lors de l'instanciation les liens réels n'ont aucun effet sur ce qui
se passe dans la machine hôte.

# Définir un objet spécifique

La définition d'un objet personnalisé est assez linéaire, en suivant une approche
orientée objet. Voici par exemple comment il est possible de définir un switch
à deux ports :

```python
class MyCustomSwitch(Switch):
    """
    This class illustrates how a custom network object can be created
    by simply inheriting base objects
    """

    def __init__(self, name: str, mac_addr: str = None, ip_addr: str = None):
        # Each topology object has a name
        super().__init__(name
            mac_addr   = mac_addr,        # Not mandatory
            ip_addr    = ip_addr,         # Not mandatory


            stp_config = {
                "rstp_enabled": True,     # Enable RSTP!
                "bridge_priority: 0x8000, # Set bridge priority
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

        dghlepers.box_logo_node(dot, self.name, dghelpers.asset("icons/material/router.png"), f"Switch {self.name}")
```

Les éléments notables ici sont :

- Chaque objet du réseau à un nom unique ;
- La méthode `export_graphviz()` export l'objet sur un graphe `graphviz`.
  les icônes [google material](https://github.com/google/material-design-icons)
  sont incluses dans le package.

Pour définir un objet _from scratch_, il est possible de dériver la classe
`PyxNetObject`. Les méthodes suivantes peuvent-être spécialisées :

- `instanciate(self)` : implémente comment l'objet est instancié sur la plateforme
  linux
- `remove(self)` : implémente comment l'objet est enlevé de la plateforme linux ;
- `up(self)` : implémente comment l'objet est activé sur la plateforme linux ;
- `down(self)` : implémente comment l'objet est désactivé sur la plateforme linux.
- `export_graphviz(self, dot)` : implémente comment l'objet est représenté sur un diagramme graphviz.

# Roadmap

Voici, en vrac, quelques fonctionnalités prévues pour le futur :

- [ ] Possibilité d'intégrer facilement un logiciel tiers, par exemple un serveur tftp, notamment via l'utilisation des `namespace` d'iproute;
- [ ] De la même manière, possibilité de se brancher sur des conteneurs et réseau docker.
