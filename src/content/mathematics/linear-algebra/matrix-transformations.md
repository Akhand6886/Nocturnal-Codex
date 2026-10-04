---
title: "Matrix Transformations & Graphics Pipeline"
description: "Linear transformations, kernel, image, the Rank-Nullity theorem, and 3D affine transformation matrices in graphics rendering engines."
---

## 1. Linear Maps and Matrix Representation

A function $T: V \to W$ between two vector spaces over the same field is a **Linear Transformation** (or linear map) if and only if it preserves vector addition and scalar multiplication for all $u, v \in V$ and $c \in \mathbb{F}$:

$$T(u + v) = T(u) + T(v)$$
$$T(c \cdot u) = c \cdot T(u)$$

### The Fundamental Theorem of Linear Maps
Every linear transformation between finite-dimensional spaces $T: \mathbb{R}^n \to \mathbb{R}^m$ can be represented **uniquely as matrix multiplication**:

$$T(x) = A x$$

where the $j$-th column of matrix $A \in \mathbb{R}^{m \times n}$ is the image of the $j$-th standard basis vector $e_j$:

$$A = \begin{bmatrix} | & | & & | \\ T(e_1) & T(e_2) & \dots & T(e_n) \\ | & | & & | \end{bmatrix}$$

---

## 2. Kernel, Image, and the Rank-Nullity Theorem

Let $A \in \mathbb{R}^{m \times n}$ represent a linear transformation $T: \mathbb{R}^n \to \mathbb{R}^m$.

### The Kernel (Null Space)
The **Kernel** (or Null Space $\text{Null}(A)$) is the set of all input vectors that map to the zero vector:

$$\ker(T) = \text{Null}(A) = \{ x \in \mathbb{R}^n \mid Ax = \mathbf{0} \}$$

The dimension of $\text{Null}(A)$ is called the **Nullity**.

### The Image (Column Space)
The **Image** (or Column Space $\text{Col}(A)$) is the set of all reachable outputs in the target space:

$$\text{im}(T) = \text{Col}(A) = \{ y \in \mathbb{R}^m \mid y = Ax \text{ for some } x \in \mathbb{R}^n \}$$

The dimension of $\text{Col}(A)$ is called the **Rank** of the matrix.

### The Rank-Nullity Theorem
For any linear map $T: \mathbb{R}^n \to \mathbb{R}^m$:

$$\text{Rank}(A) + \text{Nullity}(A) = n$$

$$\dim(\text{im}(T)) + \dim(\ker(T)) = \dim(\text{Domain})$$

```
Input Dimension n (Columns of A)
┌──────────────────────────────┬──────────────────────────────┐
│       Rank (dim Col(A))      │     Nullity (dim Null(A))    │
│  Information Preserved in y  │    Information Lost to Zero  │
└──────────────────────────────┴──────────────────────────────┘
```

In data compression and neural networks, any dimension in the null space represents **irrecoverable information loss**.

---

## 3. 3D Graphics: Affine Transformations & Homogeneous Coordinates

In computer graphics (OpenGL, DirectX, Metal, WebGPU), pure linear transformations can rotate, scale, and shear, but **cannot translate** (shift) a point because linear maps must satisfy $T(\mathbf{0}) = \mathbf{0}$.

To overcome this, computer scientists use **Homogeneous Coordinates**, embedding 3D space into a 4D projective space:

$$\begin{bmatrix} x \\ y \\ z \end{bmatrix} \implies \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

### The 4x4 Affine Transformation Matrix

$$\begin{bmatrix} x' \\ y' \\ z' \\ 1 \end{bmatrix} = \begin{bmatrix} 
R_{11} & R_{12} & R_{13} & T_x \\ 
R_{21} & R_{22} & R_{23} & T_y \\ 
R_{31} & R_{32} & R_{33} & T_z \\ 
0 & 0 & 0 & 1 
\end{bmatrix} \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

### The Model-View-Projection (MVP) Pipeline
Every 3D vertex $v$ undergoes three sequential matrix multiplications on the GPU vertex shader:

$$v_{\text{clip}} = P \cdot V \cdot M \cdot v_{\text{local}}$$

1. **Model Matrix ($M$)**: Transforms vertices from local object space to global world space.
2. **View Matrix ($V$)**: Transforms world coordinates into camera-centric coordinates.
3. **Projection Matrix ($P$)**: Applies perspective foreshortening (objects further away appear smaller) mapping view frustum into Normalized Device Coordinates (NDC $[-1, 1]^3$).

---

## 4. Python Implementation: 3D Camera Projection

```python
import numpy as np

def create_perspective_projection(fov_degrees: float, aspect: float, near: float, far: float) -> np.ndarray:
    """Computes standard 4x4 OpenGL perspective projection matrix."""
    fov_rad = np.radians(fov_degrees)
    tan_half_fov = np.tan(fov_rad / 2.0)
    
    P = np.zeros((4, 4), dtype=np.float32)
    P[0, 0] = 1.0 / (aspect * tan_half_fov)
    P[1, 1] = 1.0 / tan_half_fov
    P[2, 2] = -(far + near) / (far - near)
    P[2, 3] = -(2.0 * far * near) / (far - near)
    P[3, 2] = -1.0
    return P

# Project a 3D vertex at (0, 1, -5) with 60 deg FOV, 16:9 aspect ratio
P = create_perspective_projection(60.0, 16.0 / 9.0, 0.1, 100.0)
vertex_4d = np.array([0.0, 1.0, -5.0, 1.0])
clip_space = P @ vertex_4d

# Perspective divide: divide by w
ndc = clip_space[:3] / clip_space[3]
print(f"Projected Screen NDC coordinates: {ndc}")
```
