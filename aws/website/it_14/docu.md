06.06
Promt 14: Hier ist mein bisheriger Code: <<Code>>

Kannst du mir noch diese Features hinzufügen:
1. Steuerung auch über w (hoch), a (links), s (runter), d (rechts)
2. Eine Möglichkeit für einen Geschwindigkeitsboost, entweder während des drückens einer zusätzlichen Boost-Taste (zb „b“), oder durch das gedrückt halten der Richtungstaste
3. Einen Timer der, ähnlich wie der apfel score, als vergleichswert dient. Er soll starten wenn die Runde losgeht und enden wenn man verliert. Die Zeit soll wie der Score im Local storage gespeichert werden.
   Kannst du den code mit den erweiterungen bitte vollständig generieren, sodass ich meinen alten code durch die neue version ersetzen kann
Zeit für die Generierung: sofort, sehr schnell

Antwort:14

Natürlich! Hier ist dein vollständiger HTML/JS-Code deines Snake-Spiels, erweitert um:
1. WASD-Steuerung zusätzlich zu den Pfeiltasten.
2. Boost-Funktion durch Gedrückthalten der Taste B (erhöht die Geschwindigkeit während des Haltens).
3. Runden-Timer, der bei Spielstart beginnt, bei Game Over stoppt, angezeigt wird und in localStorage gespeichert wird.
   Du kannst diesen Code eins zu eins verwenden und deinen alten Code damit ersetzen:


FAzit: Zeit zur Generierung: ca. 1 min.
Snake bewegt sich so schnell, dass sie innerhalb eines Bruchteiles einer Sekunde gegen die Wand fährt und das Spiel beendet wird.
Ein Blick in den Code zeigt, dass die KI die Standardgeschwindigkeit von 1 auf 200 hochgesetzt hat, weil sie in der Beschleinigungsfunktion 200/100 rechnet, um die doppelte Geschwindigkeit zu erhalten
Lessons Learned: ChatGPT versteht nicht intuitiv, was von ihm gewollt ist und hat auch intern keine Möglichkeit den Code zu testen. Außerdem sind der KI nicht die Auswirkungen seines Handels im Ändern der Standardgeschwindigkeit ersichtlich und es ist auch nicht ersichtlich, wieso die Boost-Geschwindigkeit 200/100 sein muss und nicht einfach 2 sein kann. Eine Vermutung ist, dass in den zugrunde liegenden Vorlagen im Training Variablen für diese Werte vorhanden waren, diese bei uns allerdings nicht vorliegen, und die KI so keine Transferleistung bringen kann. 
