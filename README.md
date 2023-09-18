# ePAS UI
## Electronic Personnel Attendance System - User Interface

[![license](https://img.shields.io/badge/License-AGPL%20v3-blue.svg?logo=gnu&style=for-the-badge)](https://github.com/consiglionazionaledellericerche/epas-ui/blob/master/LICENSE)
[![contributors](https://img.shields.io/github/contributors/consiglionazionaledellericerche/epas-ui.svg?logo=github&style=for-the-badge)](https://github.com/consiglionazionaledellericerche/epas-ui/contributors/)
[![Downloads](https://img.shields.io/github/downloads/consiglionazionaledellericerche/epas-ui/total?logo=github&style=for-the-badge)](https://github.com/consiglionazionaledellericerche/epas-ui/pkgs/container/epas-ui)
[![ePAS on developers.italia.it](https://img.shields.io/badge/Italia-blue.svg?label=ePAS&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABd1BMVEUAZM0AYswAYcwAYs0Ea88Fa88Das8GbNACaM4Gac/B3/Xg8Pra7fnn9fx8suYAXMoHaM/u9fz///+YwOsAWcoFaM7m8fqTvuoAXMsAWsoAW8oAX8sAX8yOu+kAU8gAXssAYMwAY81Cj9t5seZUmt4EaM4LbNAhetQcd9Mdd9MgedShx+0VctIjetQle9V3sea01PFoqeP8/v/9//88jdoAXcv9/v/e7PkJa8/u9vw/jNprq+Tj7/oCZs4ed9NlouFpquM7jNrl8Prs9fxCjttpquT6/f7v9/3y+f36/v/S5vcFZ85anN/1+v2fx+2QvuoAZs4Nb9EOcNEOb9ERcNE8jNolfdWHt+gAVciKuegBZs7g7fmSv+rR5ffl8vs5i9kScdEfeNQZdNK00/H3+/7D2/RopuLR5vdwruVAj9sMbtDn8/vl8fsAZc1HlN251/Ku0PCv0PAogNYoftWexu3h7vn2/P7t9fzW5/eXwusBZc0PcNESc9L054SXAAABXklEQVQ4y72TZ1/CMBDG29SFqxpBu6SJigMXKlUcuLfinrj33nt8eC/Q8qssX8m9epL8c8lzl3DcvwSPEBLSrAtZ2Tm5eXzq/Y78gsKiYjElgEpKMcZlztSAqxyAihjAS7KCIkJVNU2wgEq3rhPKeFpVXeMhsF5bV9/g9Qgm0NjU3OKlQCitMPKBK6UNt3dgv2ECuBPjLhdYCXSzUY/Byb1M+EULgOgLAtAfkQMy5xxkYkiyAcNBuJJjhMlRiZPHfgHjE5NT0zOQQZoNYTxHeQuwjphfWFxaZvWmxsrqmgo+4zKsbxCCooUghs78xgGbCZWMOyIRMF2If2WQMgHw4S0Q225VI8kBinZA7O7tHxyipAAnHkU6cYxPNGq3GQPkU7NZZ8QOyOds7gIAcnkVBa5v7E/buL27f/A9qkw+Pb+EXt/ePz7tGSiRFMWIXktXwl/fAWTwaT4X9JJymYkfJHxA0uanFlQAAAAASUVORK5CYII=)](https://developers.italia.it/it/software/cnr-consiglionazionaledellericerche-epas)
[![Version](https://img.shields.io/github/v/release/consiglionazionaledellericerche/epas-ui.svg)](https://github.com/consiglionazionaledellericerche/epas-ui/blob/main/VERSION)

ePAS UI è la nuova interfaccia utente di ePAS client side, fornirà solo l'interfaccia WEB è pensata per essere il più simile
possibile all'attuale interfaccia utente di ePAS generata server side.

ePAS UI deve essere affiancata ad un'istanza funzionante di epas-service della quale utilizzerà gli endpoint REST.

Il progetto è attualmente in fase di sviluppo e nelle prime versioni fornirà solo interfacce in sola lettura
per la consultazione dei proprio dati da parte del personale dipendente.

Per maggiori informazioni su ePAS è possibile consultare la documentazione completa all'indirizzo:

- [https://consiglionazionaledellericerche.github.io/epas/](https://consiglionazionaledellericerche.github.io/epas/)

## ePAS UI

ePAS UI fornisce già alcune interfacce utente utilizzabili in produzione per:

 - la visualizzazione della situazione mensile
 - la visualizzazione delle assenze mensili ed annuali
 - la visualizzazione dei calendari di reperibilità

Le interfacce saranno estese per coprire la maggior parte delle attuali funzionalità dell'interfaccia di ePAS generata
lato server.

Al momento è possibile utilizzare l'autenticazione tramite Bearer Token OAUTH2 oppure Basic Auth.

## 👏 Come Contribuire 

Lo scopo principale di questo repository è continuare ad evolvere ePAS. 
Vogliamo contribuire a questo progetto nel modo più semplice e trasparente possibile e siamo grati
alla comunità per ogni contribuito a correggere bug e miglioramenti.

## 📄 Licenza

ePAS Service è concesso in licenza GNU AFFERO GENERAL PUBLIC LICENSE, come si trova nel file
[LICENSE][l].

[l]: https://github.com/consiglionazionaledellericerche/epas-ui/blob/master/LICENSE

## Vedi anche

  - [Documentazione completa di ePAS ](https://consiglionazionaledellericerche.github.io/epas/)
  - [ePAS - codice sorgente](https://github.com/consiglionazionaledellericerche/epas)
  - [ePAS Service](https://github.com/consiglionazionaledellericerche/epas-service)
  - [ePAS client - file locali / ftp /sftp e lettori smartclock](https://github.com/consiglionazionaledellericerche/epas-client)
  - [ePAS client - timbratura da database SQL](https://github.com/consiglionazionaledellericerche/epas-client-sql)
