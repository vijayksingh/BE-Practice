import pygame
from sys import exit

# Similar to starting a car
pygame.init()
pygame.display.set_caption("Runner")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 48)
SCREEN_HEIGHT = 400
SCREEN_WIDTH = 800
# What is a display surface ?
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))


def move_snail():
    global snail_rect
    snail_rect.left -= 4
    if snail_rect.left <= 0 - snail_surface.get_width():
        snail_rect.left = SCREEN_WIDTH


sky_suface = pygame.image.load("Python/Pygame/graphics/Sky.png").convert()
ground_surface = pygame.image.load("Python/Pygame/graphics/ground.png").convert()

text_surface = font.render("Hello World", False, "White")
text_rect = text_surface.get_rect(center=(400, 100))

snail_surface = pygame.image.load(
    "Python/Pygame/graphics/snail/snail1.png"
).convert_alpha()
snail_rect = snail_surface.get_rect(midbottom=(600, 300))

player_surf = pygame.image.load(
    "Python/Pygame/graphics/Player/player_walk_1.png"
).convert_alpha()
player_rect = player_surf.get_rect(midbottom=(100, 300))
player_gravity = 0
double_jump = 1

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            exit()

        if event.type == pygame.KEYDOWN:
            print(player_rect.bottom)
            print(double_jump)
            if event.key == pygame.K_SPACE and (
                player_rect.bottom >= 300 or double_jump
            ):
                double_jump -= 1
                player_gravity = -20
                player_rect.y += player_gravity

    screen.blit(sky_suface, (0, 0))
    screen.blit(ground_surface, (0, 300))
    pygame.draw.rect(screen, "Pink", text_rect, 10, 4)
    pygame.draw.rect(screen, "Pink", text_rect)
    screen.blit(text_surface, text_rect)
    screen.blit(snail_surface, snail_rect)
    screen.blit(player_surf, player_rect)
    move_snail()

    # Player
    player_gravity += 1
    if player_rect.bottom < 300:
        player_rect.y += player_gravity
    else:
        player_rect.bottom = 300
        double_jump = 1

    # draw all our elements and listen for everything
    pygame.display.update()
    clock.tick(60)
