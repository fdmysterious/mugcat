---
title: "UMX Frankenstein"
date: 2020-02-26T10:00:00+00:00
draft: true
cover_source: https://unsplash.com/fr/photos/QQ6PWLVvPHQ
---

# Vidéo

<iframe src="https://medias.ircam.fr/embed/media/xe73b89" allowfullscreen="" width="480" height="360" frameborder="0"></iframe>


# Présentation

This presentation summarizes, in a few minutes, the `UMX Frankenstein` project
on which I have been working whenever I have some free time. The goal is to
recycle the keybed of a Behringer master keyboard and integrate it with an
[Axoloti](https://axoloti.com) board. The objective is to build a customizable
standalone digital synthesizer.

To simplify matters, I have chosen to develop a separate board that handles the
interface between the keyboard and the Axoloti. This board directly sends MIDI
messages, either through the SPI bus (as shown in the presentation) or directly
through the DIN port using the UART bus (I haven't decided on the choice yet).

So far, I have successfully created a prototype that implements matrix scanning
for the keyboard, converts the key measurements into MIDI messages, and
includes basic velocity handling.
