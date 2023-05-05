---
layout: post
title:  "How to pick the right managed service"
subtitle: "A wide range of options is great but an informed choice can be quite time-consuming"
tags: [software architecture, diagrams]
imgs-path: /assets/img/how-to-pick-the-right-managed-service/
cover-img: /assets/img/how-to-pick-the-right-managed-service/caramelle.jpg
permalink: /how-to-pick-the-right-managed-service/
---

{: .toc .toc-title}
- [Un esempio *abbastanza* facile](#un-esempio-abbastanza-facile)
- [un esempio non-così-facile](#un-esempio-non-così-facile)
- [L'approccio razionale analitico](#lapproccio-razionale-analitico)
- [L'approccio intuitivo](#lapproccio-intuitivo)

Durante lo sviluppo di una feature spesso è conveniente introdurre un nuovo servizio, per esempio un nuovo database, un nuovo tipo di storage, computing o un servizio di integrazione.

In qualche caso la scelta è abbastanza facile, perché nel contesto del progetto non ci sono alternative altrettanto valide o perché si tratta di una strada universalmente riconosciuta come ottimale, o almeno preferibile.
Sia chiaro, ci sono *sempre* alternative possibili da prendere in considerazione, ma in qualche caso non ha molto senso spendere tanto tempo a valutarle perché una di queste è molto chiaramente preferibile.

# Un esempio *abbastanza* facile

Prendiamo come esempio il caso d’uso di un componente software che ha bisogno di una cache per ridurre il numero di accessi al database ed aumentare il throughput. Si tratta di una applicazione ospitata su un cloud provider, e non ci sono vincoli troppo stringenti di budget. I volumi di dati non sono eccessivamente pesanti e abbiamo bisogno di un semplice key value store in memoria. La strategia migliore potrebbe essere quasi scontata: utilizzare Redis come servizio gestito. Impatto infrastrutturale minimo per il team devops, adozione di uno strumento affermato e standard, conosciuto e amato dagli sviluppatori, ecc ecc.
Si potrebbe parlare per ore di tutte le possibili alternative, sfumature di configurazione e diverse opzioni possibili, però tutto sommato penso che il 90% delle persone sarebbero abbastanza d’accordo nel suggerire a grandi linee la stessa strada.

# un esempio non-così-facile

La scelta non è sempre così facile, a volte ci sono *tanti* servizi gestiti che calzerebbero perfettamente sul caso d'uso, o che comunque in modi leggermente diversi ci porterebbero ad ottenere il risultato desiderato.
In questi casi le variabili da considerare sono tante, e non è facile metterle tutte sul tavolo per prendere la decisione giusta. 

Un esempio che mi è capitato recentemente: quale storage usare per un certo tipo di metriche provenienti da dispositivi IoT? Si tratta di un progetto su AWS, e le opzioni possibili qui sono tantissime: Amazon Timestream? Con quale lifecycle policy? Amazon DynamoDB? Con quale configurazione di PrimaryKey? Potrebbe funzionare bene anche OpenSearch o ElasticSearch? Oppure Amazon Managed Service for Prometheus? E se invece usassimo una buona vecchia tabella partizionata su Amazon RDS for PostgreSQL?
In aggiunta al carico legato alla scrittura è necessario leggere in maniera intensiva? qualI pattern di lettura dovremo utilizzare?
Quale sarà il ciclo di vita del dato?

La questione non è semplice, e l'effetto di questa scelta può avere un impatto enorme sui costi, sul tempo necessario a raggiungere il risultato e sul suo valore finale.

# L'approccio razionale analitico
![]({{page.imgs-path}}pallottoliere.jpg){: .float-right .max-width-50}

L'approccio più naturale, visto che siamo software engineers, è quello di porci delle domande, tirare fuori qualcosa di misurabile, e pesare i pro e i contro.
 
Se è un nuovo servizio, per esempio sarebbe giusto chiedersi:
- Qual è il modello dei costi? Sono sostenibili?
- Non avendo dati storici sui costi, siamo certi che non ci siano dei costi collaterali?
- Quanto tempo possiamo investire in un POC per validare la teoria e fare dei test?
- Qual è il delta di valore che il servizio darebbe in più, sul breve e sul lungo periodo?
- Abbiamo considerato tutti I costi extra di un servizio in più? Per esempio quelli legati all’effort aggiuntivo per processi devops, il monitoraggio e la manutenzione?
- Ci sono dei vantaggi indiretti nella sua adozione? Porterebbe valore al progetto anche per altre funzionalità in futuro?
- La nuova tecnologia potrebbe in futuro diventare un problema per mancanza di competenze in azienda?

Se parliamo di un servizio già utilizzato le domande saranno leggermente diverse, ma comunque importanti, per esempio:
		○ Il modello dei costi di cui ho già una serie storica è valido al 100% anche in questo nuovo scenario?
		○ Sto accettando dei compromessi rispetto alle alternative?
		○ Siamo sicuri di avere considerato tutte le alternative?
È facile optare per una buona soluzione priva di rischi al posto di una soluzione ottimale con qualche margine di rischio, ma potrebbe non essere sempre una strategia vincente nel lungo periodo.

Ci sono poi tante altre domande più generiche che spesso si dimenticano:
	• Il servizio è maturo e production-ready?
	• E` già stato indicato come generally available?
	• Il servizio di supporto offerto è adeguato all'ambiente di produzione? 
	• Il servizio è geograficamente disponibile nella region in cui si dovrà deployare il progetto?
Lo è o almeno lo sarà anche nelle region in cui è prevista una espansione?
		
Questo non vuole essere un elenco esaustivo, sto sicuramente dimenticando parecchie domande, e ovviamente le particolarità del singolo progetto potrebbero produrne altre di più specifiche e dettagliate.

L'ulteriore cattiva notizia è che per seguire un approccio analitico di questo tipo dovremmo rispondere a tutte queste domande *per ognuna* delle opzioni possibili.
Quando poi la scelta non è solo su un singolo componente ma ne coinvolge più di uno, la quantità di possibili varianti cresce in maniera esponenziale, e di conseguenza lo fa anche il numero di valutazioni da fare per chi deve prendere questa decisione.
In questi casi questo tipo di approccio, che in linea di principio è sempre quello preferibile, potrebbe diventare molto impegnativo o addirittura insostenibile.

# L'approccio intuitivo
![]({{page.imgs-path}}platone.jpg){: .float-left .max-width-50}

Per non rimanere impantanati in un'analisi infinita, arrivati a questo punto l'unica via di uscita è quella di utilizzare la propria esperienza, costruita soprattutto sugli errori passati, per fare una scelta dettata *anche* da una piccola componente istintiva.

Lo scopo non è certo quello di fare scelte irrazionali e non guidate dai dati, ma dal mio punto di vista a volte è fondamentale provare a semplificare il problema togliendo dal tavolo alcune opzioni senza investimenti importanti di tempo, o comunque limitandosi a cercare un singolo motivo valido per poterle scartare. Mi riferisco a tutte quelle opzioni che, pur essendo possibili, sensate, e magari anche con qualche punto di forza notevole, possiamo comunque supporre con un certo grado di sicurezza che non saranno quelle con il miglior bilanciamento costi/benefici.
Qualche esempio:
	- Il servizio costa molto più rispetto ad altre opzioni, e per il progetto il costo è una componente critica (ammesso che ne esistano in cui non sia così)
	- Il servizio presuppone una conoscenza molto specifica che nel team non c'è e non c'è tempo di acquisire quella competenza
	- Sono richieste prestazioni elevatissime, e altre soluzioni sono sicuramente migliori

Ridurre il numero di opzioni affidandosi all'esperienza è il modo migliore per fare in modo che le opzioni rimanenti siano poche e che un approccio analitico sia sostenibile.
Come sempre quando si parla di architettura del software occorre essere flessibili e trovare un punto di equilibrio, a volte accettando qualche compromesso.

Last but not least, una volta che la decisione è presa, è *fondamentale* documentarla in un ADR (architectural decision record), per una lunga serie di buoni motivi, di cui magari in futuro parlerò in un articolo dedicato.


