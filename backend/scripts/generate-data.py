# A Количество задач на проект
# B Количество задач после утверждения
# C Количество выполненых задач по плану
# D Количество выполненых задач внеплана

# L Количество задач выполненых быстрее чем надо

# K Соотношение L к ко всем задачам на проект. В том числе на утверждение 

# E C/A соотношение выполненых задач по плану
# F D/B соотношение выполненых задач внепланово
# G avg переключений статуса на задачу за проект
# H Соотношение внеплановых задач к плановым

import numpy as np

# Set the seed for reproducibility
# np.random.seed()

# Set the parameters for generating random values
min_tasks = 50
max_tasks = 100
min_completed_planned = 0
max_completed_planned = 50
min_completed_unplanned = 0
max_completed_unplanned = 30
std_deviation = 5  # Standard deviation for generating random values

# Generate random values for A, B, C, and D
A = int(np.random.normal((min_tasks + max_tasks) / 2, std_deviation))
B = int(np.random.normal((min_tasks + max_tasks) / 2, std_deviation))
C = int(np.random.normal((min_completed_planned + max_completed_planned) / 2, std_deviation))
D = int(np.random.normal((min_completed_unplanned + max_completed_unplanned) / 2, std_deviation))

# Ensure values are within valid ranges
A = max(min_tasks, min(A, max_tasks))
B = max(min_tasks, min(B, max_tasks))
C = max(min_completed_planned, min(C, min(max_completed_planned, A)))
D = max(min_completed_unplanned, min(D, min(max_completed_unplanned, B - C)))

# Calculate E, F, G, and H
E = C / A if A != 0 else 0
F = D / B if B != 0 else 0
G = np.random.randint(1, 10)  # Average number of status switches (randomly generated)
H = D / C if C != 0 else 0

# Print the generated values and calculations
print("Generated values:")
print(f"A: {A}, B: {B}, C: {C}, D: {D}")
print("Calculated values:")
print(f"E: {E:.2f}, F: {F:.2f}, G: {G}, H: {H:.2f}")

print(f"Planned tasks: {C}/{A}")
print(f"Unplanned tasks: {D}/{B}")
print(f"Avg status switches: {G}")
print(f"Relation unplanned to planned: {H}")
