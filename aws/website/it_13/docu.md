06.06
Promt 12: Hier ist mein bisheriger Code: <<Code>>

Ich habe dabei leider zwei kleine Bugs:
1. Der Apfel blinkt die ganze Zeit, statt einmal aufzutauchen
2. wenn die Schlange in eine Richtung läuft und man einen Steuerungsimput in die andere macht, dann verliert man das spiel. Das gleiche auch wenn man schnell zwei inputs hintereinander macht.
   Kannst du diese Bugs fixen und mir den neuen code vollständig generieren, sodass ich meinen alten code durch den neuen ersetzen kann?

 
Antwort 12:

✅ Behobene Bugs:
1. Apfel blinkt nicht mehr dauerhaft: Das lag daran, dass draw() bei jedem Frame den Apfel neu erstellt – mit Animation. Jetzt wird die Animation nur beim Spawnen angewendet.
2. Sofortige Richtungsumkehr führt nicht mehr zum Game Over: Es wurde eine neue Variable nextDirection eingeführt, um Eingaben pro Frame zu puffern und Kollisionen durch direkte Umkehr oder Doppeltasten zu vermeiden.

FAzit: Zeit für die Generierung: sofort, sehr schnell. Zwei Bugs wurden behoben. Die KI erkennt ihre Fehler selbst sehr gut.

Learnings bisher: Benutzt ChatGPT ein aktuelleres Modell oder wurde unser Tokenlimit zurückgesetzt? Diese Iteration ist die erste des Arbeitstages.
Wenn man die KI darauf hinweist, dass ein Fehler vorliegt, erkennt sie den Fehler und kann ihn im Falle unseres einfachen Beispiels auch im Code ausfindig machen und beseitigen. Die Fehler werden allerdings nur bei spezifischer Anfrage beseitigt. Das spricht wieder dafür, dass die KI sich den Code außerhalb des für sie relevanten im Promt definierten Bereiches nicht anschaut und ihn lediglich Kopiert.
