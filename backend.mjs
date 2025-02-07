import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090');



export async function allMaisons() {
    let Favoris = await pb.collection('maisons').getFullList({ 
    });

    Favoris = Favoris.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.images); 
        return maison;
    });

    return Favoris;
}

export async function allMaisonsFavoris() {
    let Favoris = await pb.collection('maisons').getFullList({ 
        filter: 'favori = true'
    });

    Favoris = Favoris.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.images); 
        return maison;
    });

    return Favoris;
}

 /*
export async function allMaisonsFavoris() {
    let Favoris = await pb.collection('maisons').getFullList({ filter: 'favori = true'
        }) ;
        maison.favori = pb.files.getURL(maison, maison.favori);
    return Favoris ;
    }


export async function OneID(id) {
const oneRecords = await pb.collection('maisons').getOne(id) ;
return oneRecords ;
}




export async function allMaisonsSorted() {
const Prix = await pb.collection('maisons').getFullList({ sort: 'prix'}
    ) ;
return Prix ;
}

export async function bySurface(s) {
const Surface = await pb.collection('maisons').getFullList({ filter: `surface > ${s}`,}
    ) ;
return Surface ;
}

export async function surfaceORprice(s,p) {
const SurfaceORPrix = await pb.collection('maisons').getFullList({ filter: `surface > ${s}&& prix < ${p}` }
    ) ;
return SurfaceORPrix ;
}
*/
