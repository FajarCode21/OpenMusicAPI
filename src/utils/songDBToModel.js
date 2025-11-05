export const songDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id: albumId,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});
