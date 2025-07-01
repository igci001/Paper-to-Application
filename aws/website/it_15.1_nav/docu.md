Prompt 15: Ich möchte die unterschiedlichen Iterationen meiner App über eine Navigation miteinander verbinden. Auf der linken Seite soll jeweils immer eine Liste mit den ganzen Versionen angezeigt werden, die einen direkt zur angeklickten Version bringt. Die Homepage ist auch eine Liste mit den unterschiedlichen Versionen. Meine Ordnerstruktur ist die, dass ich jeweils immer einen Order mit dem namen it_1, it_2, usw habe, in der eine HTML-Datei liegt.

Generiere mir eine HTML-Datei für die Homepage und gibt mir an, wie ich jeweils die einzelnen HTML Dateien der Versionen ändern muss.

Weiterhin nutze ich vanilla JS für meine Webseite mit .index referenzen. Wie Bündel ich diese zusammen sodass ich dies auf AWS in das S3 bucket pushen kann
Antwort 15: Hier ist ein kompletter Vorschlag, wie du deine mehrere Versionen deiner App per Navigation verknüpfen, eine Übersichtsseite (Homepage) erstellen und deine App samt JavaScript für AWS S3-Deployment vorbereiten kannst.
⸻
🏠 1. HTML-Datei für die Homepage (index.html)
Speichere diese Datei auf der obersten Ebene deines Projekts: <Code main.html>
Hier ist ein kompletter Vorschlag, wie du deine mehrere Versionen deiner App per Navigation verknüpfen, eine Übersichtsseite (Homepage) erstellen und deine App samt JavaScript für AWS S3-Deployment vorbereiten kannst.


🔁 2. Jede Iteration anpassen (it_1/index.html, it_2/index.html, …)

Füge in jeder Version eine Navigation auf der linken Seite hinzu, damit du zwischen den Versionen wechseln kannst. Beispiel für it_1/index.html:

Du kannst diesen Block in jede andere Version kopieren und den <title> und <h1> anpassen. Achte bei relativen Pfaden auf die ../, damit die Navigation richtig funktioniert.

<Code nav.html>

📦 3. Vanilla JavaScript bündeln (optional)

Wenn du dein JavaScript aufteilst (z. B. snake.js, menu.js, utils.js), kannst du sie mit einem simplen Build-Tool wie esbuild oder rollup bündeln, z. B. mit esbuild:
Schritt-für-Schritt (optional):

	1.	Installiere esbuild (wenn Node.js installiert ist):


lessons learnt: 
Die Ursprünglichen Iterationen, vor allem bis Iteration 7 sind nicht flexibel entwickelt worden. Die Seiten sind kaputter als gedacht. Es fällt allerdings erst jetzt auf, wenn mehr als ein Elemtn auf dem Screen ist. Das Experiment wäre in diesem Schritt auch gescheitert, da man manuell in jede Datei gehen musste, um die HTML Verlinkungen einzusetzen. Die Vorgabe ist für einen Laien vermutlich nur schwer verständlich.
Zeit zur Code-Generierung: 30sek