"""
Implementation of PONG GAME
"""
# pylint: disable=no-member

import sys
import pygame


def animate_ball():
    global ball_speed_x, ball_speed_y
    if ball.bottom > SCREEN_HEIGHT:
        ball_speed_y *= -1

    if ball.top <= 0:
        ball_speed_y *= -1

    if ball.left <= 0:
        ball_speed_x *= -1

    if ball.right >= SCREEN_WIDTH:
        ball_speed_x *= -1


def get_player_input():
    global user_speed
    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_UP:
            user_speed = -10
        if event.key == pygame.K_DOWN:
            user_speed = 10

    if event.type == pygame.KEYUP:
        if event.key == pygame.K_UP:
            user_speed = 0
        if event.key == pygame.K_DOWN:
            user_speed = 0


def move_player():
    user.y += user_speed
    if user.top <= 0:
        user.top = 0

    if user.bottom >= SCREEN_HEIGHT:
        user.bottom = SCREEN_HEIGHT


pygame.init()

SCREEN_HEIGHT = 800
SCREEN_WIDTH = 1280

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Pong Game")

clock = pygame.time.Clock()

ball = pygame.Rect(0, 0, 30, 30)
ball.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)

cpu = pygame.Rect(0, 0, 10, 100)
cpu.centery = SCREEN_HEIGHT // 2

user = pygame.Rect(0, 0, 10, 100)
user.midright = (SCREEN_WIDTH, SCREEN_HEIGHT // 2)

ball_speed_x = 6
ball_speed_y = 6
user_speed = 0

while True:
    # Check for events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        get_player_input()

    # Moving the ball (Increasing x and y axis after each frame)
    ball.x += ball_speed_x
    ball.y += ball_speed_y

    animate_ball()
    move_player()

    # Draw the game object (Each frame)
    screen.fill('black')
    pygame.draw.aaline(
        screen,
        "white",
        (SCREEN_WIDTH // 2, 0),
        (SCREEN_WIDTH // 2, SCREEN_HEIGHT)
    )
    pygame.draw.rect(screen, "red", ball)
    pygame.draw.ellipse(screen, "white", ball)
    pygame.draw.rect(screen, "yellow", cpu)
    pygame.draw.rect(screen, "yellow", user)

    # Update the display
    pygame.display.update()
    clock.tick(60)
