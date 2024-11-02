# POKER_Game
It's a class assignment in which I have to make a game (whatever I want) with js for the browser
Explicacion:
En el poker se puede jugar con muchas personas, pero en este caso solo jugara una persona contra la cpu, este juego se basa en apostar y se pierde cuando te quedas sin dinero( la cpu tiene dinero infinito,en este caso solo puede perder el jugador), el ganador de lo apostado se decide al finalizar cada ronda, a su vez cada ronda esta formada de otras 3 rondas:
Antes de la ronda 1:
    Tanto el jugador como la cpu apostaran 100 cada uno, esta apuesta es conocida como ciega. Es una apuesta obligatoria para poner algo de dinero en juego.
Ronda 1:
    Se reparten 2 cartas a cada jugador y 3 cartas en la mesa. Despues de cada ronda el jugador deberá  decidir si quiere apostar o pasar, si el jugador apuesta, la cpu debera decidir ir si quiere apostar o pasar, si la cpu apuesta y el jugador paso el juagador debera decidir si seguir jugando he igualar la apuesta(si no tiene suficiente para igualar apostara todo lo que tenga) o no continuar y perder la ronda. Las apuestas son iguales todas las rondas, Esta programado para que si el jugador tiene saldo igual 0 cero en mitade de una ronda(no empezo la ronda con 0) podra seguir dando a apostar y terminar esa ronda, si la gana tendra saldo y podra seguir  jugando, si la pierde su saldo al inicio de la siguiente ronda será igual a 0 y por lo tanto habrá perdido y le saldra una pagina diciendole que ha perdido y un boton para volver a empezar a jugar.
Ronda 2 y 3:
    Se reparte solo una carta en la mesa(una por ronda, es decir habra un maximo de 5 cartas en la mesa, que son las cartas comunes para todos los jugadores). Y despuesde repartir se llevan a cabo las apuesta explicadas antes.
Al terminar las 3 rondas el programa evaluara el ganador y repartira el dinero apostado y dira porque gano el ganador y mostrara las cartas de la cpu.

Las posibles manos que se puden tener son las siguientes(orden de menor importamcia a mayor importancia):
    0. No tener nada y ganar por tener la carta mas alta (la mas alta es el as)
    1. Pareja
    2. Doble pareja
    3. Trio
    4. Full
    5. Escalera
    6. Color
    7. Escalera color
    8. Poker
En caso de tener  la misma mano, el jugador con la carta mas alta gana. Si la carta mas alta es la misma, se compara la segunda carta de la mano y gana la mas alta de esas 2, pero si la mano del jugador y la cpu es identica( las cartas tienen el mismo numero) entonces gana la maquina(ya que yo he decidido que tenga preferencia).