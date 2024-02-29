interface StreamData {
	progress: number;
	timestamp: number,
	track: string,
	album: string,
	artist: string, 
	album_thumbnail_url: string,
	artist_uid: string,
	album_uid: string
}

interface Params {
	uid: string
}