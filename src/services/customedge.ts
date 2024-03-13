import {apiUrl} from '../config/app'

export async function getCombination(id: number) {
    const response = await fetch(apiUrl + '/combinations/' + id);

    return response.json();
}