---
title: "UMX Frankenstein"
date: 2020-02-26T10:00:00+00:00
draft: true
cover_source: https://unsplash.com/fr/photos/QQ6PWLVvPHQ
---

# Vidéo

<iframe src="https://medias.ircam.fr/embed/media/xe73b89" allowfullscreen="" width="480" height="360" frameborder="0"></iframe>


# Présentation

Cette présentation résume, en quelques minutes, le projet `UMX Frankenstein`
sur lequel je travaille lorsque j'ai quelques minutes devant moi. Le but est
de, en quelques mots, recycler la partie touches d'un clavier maître Behringer,
afin de l'intégrer avec une carte [Axoloti](https://axoloti.com). Le but est de construire une sorte
de synthétiseur numérique standalone customisable.

Pour simplifier, j'ai fait le choix de développer une carte à part gérant
l'interfaçage entre le clavier et l'axoloti. Celui-ci envoie directement des
trames MIDI, soit par le biais du bus SPI (comme montré dans la présentation),
soit directement par la prise DIN sur bus UART (je n'ai pas encore fixé le
choix).

J'ai pour l'instant réussi à faire un prototype mettant en œuvre le matrix scan
pour le clavier, transformation des mesures en message midi, avec gestion
sommaire de la vélocité.
