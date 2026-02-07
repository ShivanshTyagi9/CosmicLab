---
title: "CLIP guided pixel optimizations (Dreams)"
pubDate: 2026-01-23
description: "This is the first post of my new Astro blog."
author: "shivanshtyagi9"
minutesRead: "10 min"
isPinned: true
excerpt: Imagine if AI could dream or produce image that look like on drugs. LOL yea that works, but not by generation like NanoBanana or something, but manipulating the pixel itself by a literal classification model.
tags: ["CLip", "Pytorch", "Python", "Optimization"]
---


# CLIP Dream Engine  
### Semantic Image Optimization Without Diffusion

![Example](public\images\projects\clouds_space_moon.png)
![Example](public\images\projects\clouds_planet_comets_tech.png)
![Example](public\images\projects\mountains_castle_flowers.png)
![Example](public\images\projects\mountains_city_over_clouds.png)

---

## Overview

**What if an AI model could dream?**

This project explores a simple but powerful idea:

> Instead of training a generative model, what happens if we directly optimize pixels using semantic gradients from CLIP?

CLIP is not a generative model.  
It only measures similarity between images and text.

This system flips that role.

CLIP becomes the **semantic judge**, and the image itself becomes the trainable parameter.

No diffusion.  
No GAN.  
No dataset training.  

Just:

> Gradients + Constraints + Multi-scale Optimization.

---

## Code & Experiments
- Notebook: <a href="https://github.com/ShivanshTyagi9/Dreams/blob/main/dreams.ipynb" target="_blank">dreams.ipynb</a>
- Script: <a href="https://github.com/ShivanshTyagi9/Dreams/blob/main/dreams_script.py" target="_blank">dreams_script.py</a>
- PDF explanation: <a href="https://github.com/ShivanshTyagi9/Dreams/blob/main/dreams.pdf" target="_blank">dreams.pdf</a>

Run the notebook, set:
- Base image
- Text prompt
- Octaves
- Steps

And observe how meaning emerges from gradients.

---

## Core Idea

Given:

- Base image `I`
- Text prompt `T`

We optimize:

$$
\hat{I} = \min_{I} \mathcal{L}_{\text{CLIP}}(I, T)
$$

Where the goal is to maximize semantic similarity in CLIP’s embedding space.

The image is directly updated in pixel space using gradient descent.

---

## Key Components

### 1. CLIP Semantic Guidance
- Text prompt acts as an **attractor**
- Negative prompt acts as a **repellor**
- Image embeddings are optimized to move toward text embedding

---

### 2. Multi-Scale Cutouts
Instead of feeding the whole image, multiple crops are used:
- Global view
- Mid-scale views
- Local patches

This ensures:
- Global coherence
- Local detail emergence
- Better semantic alignment

---

### 3. Masked Total Variation Regularization

Without regularization, optimization produces:

- Noise
- Hallucinated artifacts
- Chaotic pixel explosions

To fix this, a **Masked TV Loss** is introduced:

$$
\hat{I} = \min_I 
\underbrace{\mathcal{L}_{CLIP}(I, T)}_{\text{what}} +
\underbrace{\lambda_{tv}\mathcal{L}_{MTV}(I, M)}_{\text{how}}
$$

- CLIP decides **what should appear**
- Masked TV decides **how it is allowed to look**

Edges are preserved.  
Noise is suppressed.  
Flat regions remain stable.

---

### 4. Octave-Based Optimization

The image is optimized in progressive scales:

$$
\hat{I} = I_0 + \sum_{k=1}^{N} \Delta_k
$$

Low resolution establishes structure.  
Higher octaves refine details.

This prevents:
- High-frequency collapse
- Early-stage noise explosion

---

### 5. Pixel Clamping

CLIP operates purely mathematically.  
It does not understand physical color constraints.

Optimization can push RGB values to unrealistic ranges.

Solution:
- Clamp pixel values to `[0, 1]`
- Maintain physically valid colors

---

## What This Project Is

- Energy-based generative system
- CLIP-guided semantic hallucination engine
- Research exploration of optimization-driven generation

## What This Project Is Not

- Not a diffusion model
- Not a GAN
- Not trained on datasets
- Not an image editor

---

## Technical Stack

- PyTorch
- OpenCLIP
- Multi-scale augmentation
- Custom Masked TV Loss
- Cosine LR scheduling
- Mixed precision (CUDA support)

---

## Conceptual Summary

This project demonstrates that meaningful visual structure can emerge from:

> Semantic similarity + Multi-scale views + Regularization.

No sampling.  
No training.  

Just optimization.
