import PocketBase from 'pocketbase' ;
const pb = new PocketBase('http://127.0.0.1:8090');



export async function allMaisons() {
    let maisons = await pb.collection('maisons').getFullList({ 
    });

    maisons = maisons.map((maison) => {
        maison.imgUrl = pb.files.getURL(maison, maison.images); 
        return maison;
    });

    return maisons;
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

export async function getOffre(id) {

        let data = await pb.collection('maisons').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.images);
        return data;
   
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
    let Surface = await pb.collection('maisons').getFullList({
        filter: `surface > ${s}`,
    });

    Surface = Surface.map((Surface) => {
        Surface.imgUrl = pb.files.getURL(Surface, Surface.images);
        return Surface;
    });

    return Surface;
}

export async function surfaceORprice(s,p) {
const SurfaceORPrix = await pb.collection('maisons').getFullList({ filter: `surface > ${s}&& prix < ${p}` }
    ) ;
return SurfaceORPrix ;
}

export async function byPrix(prix) {
        let data = await pb.collection('maisons').getFullList({
            filter: `prix < ${prix}`
        });
        data.forEach(maison => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
        });
        return data;
}

export async function addOffre(house) {
    try {
        await pb.collection('maisons').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection('maisons').getFullList({
            sort: '-created',
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.images);
            return maison;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en filtrant la liste des maisons', error);
        return [];
    }
}