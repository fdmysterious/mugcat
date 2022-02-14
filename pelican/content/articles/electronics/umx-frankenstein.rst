================
UMX-Frankenstein
================

:date:     26/02/2020
:authors:  - Florian Dupeyron <florian.dupeyron@mugcat.fr>
:thumb:    images/thumbs/2020-06-26-umx_frankenstein.png

Vidéo
=====

.. raw:: html

    <iframe src="https://medias.ircam.fr/embed/media/xe73b89" allowfullscreen="" width="480" height="360" frameborder="0"></iframe>

A propos
========

Cette présentation résume, en quelques minutes, le projet `UMX Frankenstein`
sur lequel je travaille lorsque j'ai quelques minutes devant moi. Le but est
de, en quelques mots, recycler la partie touches d'un clavier maître Behringer,
afin de l'intégrer avec une carte Axoloti_. Le but est de construire une sorte
de synthétiseur numérique standalone customisable.

.. _Axoloti: http://www.axoloti.com/

Pour simplifier, j'ai fait le choix de développer une carte à part gérant
l'interfaçage entre le clavier et l'axoloti. Celui-ci envoie directement des
trames MIDI, soit par le biais du bus SPI (comme montré dans la présentation),
soit directement par la prise DIN sur bus UART (je n'ai pas encore fixé le
choix).

J'ai pour l'instant réussi à faire un prototype mettant en œuvre le matrix scan
pour le clavier, transformation des mesures en message midi, avec gestion
sommaire de la vélocité.
