import FavoriteMovieIdb from '../src/scripts/data/favorite-movie-idb';
import createLikeButtonPresenterWithMovie from './helpers/testFactories';

describe('Unlike A Movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteMovieIdb.putMovie({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteMovieIdb.deleteMovie(1);
  });

  it('should display unlike widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeTruthy();
  });

  it('should not display like widget when the movie has been liked', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    expect(document.querySelector('[aria-label="like this movie"]')).toBeFalsy();
  });

  it('should be able to remove liked movie from the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });

  it('should not throw error if the unliked movie is not in the list', async () => {
    await createLikeButtonPresenterWithMovie({ id: 1 });

    // hapus film dengan ID 1 dari daftar film yang disukai
    await FavoriteMovieIdb.deleteMovie(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
  });
});
