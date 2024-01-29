# Overcode teszt feladat
## Feladat
A feladat egy egyszerű bevásárlólista alkalmazás elkészítése lesz. Az alkalmazás egy
táblázatos listában jeleníti meg az elemeket, a listához hozzá lehet adni új elemet, lehet
törölni meglévő elemet, és "Beszerezve" státuszúra lehet állítani a lista bármelyik elemét
(illetve ezt a státuszt vissza is lehet állítani "még nincs beszerve" státuszra).

## Telepítés
A projektet a következő paranccsal lehet telepíteni:
```docker compose build```

## Konfiguráció
A frontend felületen a következő fájlban lehet beállítani konfigurációs paramétereket (API url, stb.):
```frontend/.env```

A backend felületen a következő fájlban lehet beállítani konfigurációs paramétereket (MongoDB url, stb.):
```backend/.env```

## Használat
A projektet a következő paranccsal lehet elindítani:
```docker compose up -d```

A projektet frontend felületét a következő címen lehet elérni:
```http://localhost:8080```

A projektet API felületét a következő címen lehet elérni:
```http://localhost:3000```

A projekt Mongo Express felületét a következő címen lehet elérni:
```http://localhost:8081```

Belépési adatok a Mongo Express felületre:
```
Username: admin
Password: pass
```