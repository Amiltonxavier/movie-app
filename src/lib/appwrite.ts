import { Client, Databases, ID, Query } from "appwrite";
import { Movie } from "../types/movies.types";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const database = new Databases(client);


export const getTrendingMovie = async() => {
    try{
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])

        return response.documents
    }catch(error) {
        console.log(error);
    }
}

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
    try {
        // 1. Use Appwrite SDK to check if the search term exists in the database
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        // 2. If it does, update the count
        if (response.documents.length > 0) {
            const doc = response.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            // 3. If it doesn't, create a new document with the search term and count as 1
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            });
        }
    } catch (error) {
        console.log(error);
    }
};