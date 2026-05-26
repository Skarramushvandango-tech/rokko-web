export interface ArtistLinks {
  appleMusic?: string;
  spotify?: string;
  amazon?: string;
}

export interface Artist {
  id: string;
  name: string;
  nameH3: string;
  nameH1: string;
  image: string;
  cover: string;
  albumTitle: string;
  bio: string;
  links: ArtistLinks;
}

export const ARTISTS: Artist[] = [
  {
    id: "sukram",
    name: "Sukram",
    nameH3: "Sukram",
    nameH1: "",
    image: "/assets/artist-images/sukram-pop.png",
    cover: "/assets/coverartwork/sukram-cover.png",
    albumTitle: "D. mein Fiebertraum",
    bio: "Der böse Bube liefert uns mit – Deutschland mein Fiebertraum – eine psychedelische Indie-Rock Experience der Extraklasse. Seine Lyrics sind treffsicher ohne zu beleidigen. Vielmehr ist es ein Klagelied, welches Sukram hier zum Besten gibt. Ein Klagelied über ein Heimatland, das seine Bewohner wie Nutzvieh über den Hof treibt, um auch das letzte Bisschen Glück und Wohlstand aus der Gesellschaft zu saugen.",
    links: {
      appleMusic: "https://music.apple.com/de/album/deutschland-mein-fiebertraum-single/1893907436",
      spotify: "https://open.spotify.com/artist/0XabsS6hlubIfQTtJ5ZTkU?si=jnl_P0fpSFuxgaEI_fNz7Q",
      amazon: undefined,
    },
  },
  {
    id: "skaramush-vandango",
    name: "SkaRamush Vandango",
    nameH3: "SkaRamush",
    nameH1: "Vandango",
    image: "/assets/artist-images/skaramush-vandango-pop.png",
    cover: "/assets/coverartwork/vandango-cover.png",
    albumTitle: "Neurocentric",
    bio: "Der Gründer und Labelchef von ROKKO! Records ist selbst als Künstler aktiv. Mit seinem Projekt SkaRamush Vandango verbindet er elektronische Sounds mit roher Energie. Neurocentric steht für seine Fähigkeit, komplexe Themen in mitreißende Tracks zu verwandeln.",
    links: {
      appleMusic: undefined,
      spotify: undefined,
      amazon: undefined,
    },
  },
  {
    id: "skank-schablonski",
    name: "Skank Schablonski",
    nameH3: "Skank",
    nameH1: "Schablonski",
    image: "/assets/artist-images/skank-schablonski-pop.png",
    cover: "/assets/coverartwork/schablonski-cover.png",
    albumTitle: "Kohle raus",
    bio: "Skank Schablonski steht für kompromisslosen Sound und ehrliche Texte. Mit Kohle raus liefert er einen Track, der keine Gefangenen macht. Schablonski's Stil ist einzigartig – roh, direkt und unverkennbar.",
    links: {
      appleMusic: undefined,
      spotify: undefined,
      amazon: undefined,
    },
  },
  {
    id: "fleur-beunie",
    name: "Fléur et Beunié",
    nameH3: "Fléur et",
    nameH1: "Beunié",
    image: "/assets/artist-images/fleur-beunie-pop.png",
    cover: "/assets/coverartwork/beunie-cover.png",
    albumTitle: "Feu Léger",
    bio: "Das französische House-Duo lieferte mit Feu Léger 2025 eine French-House-Hymne der Extraklasse. Selbst die Remixe überzeugen leichtfüßig. Es ist aber nicht nur die Liebe zur Musik, welche Fléur und Beunié des Nachts zueinander treibt – die beiden sind auch privat liiert.",
    links: {
      appleMusic: "https://music.apple.com/de/artist/fl%C3%A9ur-et-beuni%C3%A9/1844299316",
      spotify: "https://open.spotify.com/artist/3TJ6OTJwduYPDW1MBwDnSd?si=eayMaoeYT6i3hvJTC8wL9A",
      amazon: undefined,
    },
  },
  {
    id: "anthony-sinclair",
    name: "Anthony Sinclair",
    nameH3: "Anthony",
    nameH1: "Sinclair",
    image: "/assets/artist-images/anthony-sinclair-pop.png",
    cover: "/assets/coverartwork/sinclair-cover.png",
    albumTitle: "waste",
    bio: "Anthony Sinclair ist einer der charakterstärksten Stimmen im ROKKO! Roster. Mit waste liefert er einen Track, der unter die Haut geht – eine Auseinandersetzung mit Verschwendung auf allen Ebenen. Sinclair's Musik ist so präzise wie sein Name.",
    links: {
      appleMusic: undefined,
      spotify: undefined,
      amazon: undefined,
    },
  },
  {
    id: "silberstreif",
    name: "Silberstreif",
    nameH3: "Silberstreif",
    nameH1: "",
    image: "/assets/artist-images/silberstreif-pop.png",
    cover: "/assets/coverartwork/silberstreif-cover.png",
    albumTitle: "Flammend Herz",
    bio: "Silberstreif steht für Hoffnung in düsteren Zeiten. Das Debütalbum Flammend Herz verbrennt alle Brücken zur Mittelmäßigkeit. Mit einer Mischung aus Emotion und handwerklicher Präzision schafft Silberstreif Musik, die nachwirkt.",
    links: {
      appleMusic: "https://music.apple.com/de/album/flammend-herz-single/1893949801",
      spotify: "https://open.spotify.com/artist/6IRLmlTvLsC41s71PiI5AW?si=e1_xR6ohQsujIPMmyDvHLg",
      amazon: "https://amazon.de/music/player/albums/B0GXG1GYGM?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_s85yutXPLbQoHmSPohAQDFoDt&trackAsin=B0GXG27F9J",
    },
  },
  {
    id: "anger-uschis",
    name: "Anger Uschis",
    nameH3: "Anger",
    nameH1: "Uschis",
    image: "/assets/artist-images/anger-uschis-pop.png",
    cover: "/assets/coverartwork/uschis-cover.png",
    albumTitle: "politisch inkontinent",
    bio: `Mit dem Debütalbum \u201epolitisch inkontinent\u201c liefert Anger Uschis ein politisch orientiertes Mahnmal gegen Hass, Hetze und Faschismus. Einige Songs wurden bereits zu kleinen Hymnen, wie \u201elachen f*cken schreien\u201c, der sich mit den niederen Gelüsten der Gesellschaft auseinandersetzt. Multifunktionslos bildet auf dem Album das Stück, das der Dummheit textlich auf sehr hoher Ebene gegenübertritt. \u2013 The Uschis have the high ground`,
    links: {
      appleMusic: "https://music.apple.com/de/artist/anger-uschis/1885764250",
      spotify: "https://open.spotify.com/playlist/6PynmXodpYNGmi6m0xKuDP?si=g4wlfy-qS9uDCzKDbYjbqw&pi=YdEbk2Y5T3-4v",
      amazon: "https://www.amazon.de/gp/product/B0GWQY499Q/",
    },
  },
  {
    id: "henri-bellieu",
    name: "Henri Bellieu",
    nameH3: "Henri",
    nameH1: "Bellieu",
    image: "/assets/artist-images/henri-bellieu-pop.png",
    cover: "/assets/coverartwork/bellieu-cover.png",
    albumTitle: "La Femme",
    bio: `Der charmant-markante Franzose liefert mit seiner Single La Femme bereits seine zweite Ode an die Weiblichkeit. Henri, der ab und an in Pariser Bars und Kneipen stand, lernte ROKKO!'s Labelchef SkaRamush bereits 2015 in Paris kennen. Die bis heute andauernde Freundschaft sorgte dann 2025 mit der Debütsingle \u201epetite Colibri\u201c für seinen Einstieg in die Welt der Popmusik.`,
    links: {
      appleMusic: "https://music.apple.com/de/artist/henri-bellieu/1844457359",
      spotify: "https://open.spotify.com/playlist/0CfFyyijTPSRqCn72ADfZM?si=IMIm836_Q4SDDaRx-ZaAnw&pi=XMWVcQ-bSs69-",
      amazon: "https://amazon.de/music/player/artists/B0FV13NT6R/henri-bellieu?marketplaceId=A1PA6795UKMFR9&musicTerritory=DE&ref=dm_sh_Sjl9Ta9PLH0YZ2H7Wn6aMB08U",
    },
  },
];
