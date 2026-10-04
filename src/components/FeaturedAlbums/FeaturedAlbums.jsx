import oasisCover from '../../assets/albums/oasis-heathen-chemistry.jpg';
import coldplayCover from '../../assets/albums/coldplay-rush-of-blood.jpg';
import harryCover from '../../assets/albums/harry-styles-house.jpg';

function FeaturedAlbums() {
  return (
    <section aria-labelledby="featured-albums-title">
      <h2 id="featured-albums-title">Álbumes destacados</h2>

      <article>
        <figure>
          <img
            src={oasisCover}
            alt="Portada del álbum Heathen Chemistry de Oasis"
            width="220"
          />
          <figcaption>Heathen Chemistry — Oasis</figcaption>
        </figure>
      </article>

      <article>
        <figure>
          <img
            src={coldplayCover}
            alt="Portada del álbum A Rush of Blood to the Head de Coldplay"
            width="220"
          />
          <figcaption>A Rush of Blood to the Head — Coldplay</figcaption>
        </figure>
      </article>

      <article>
        <figure>
          <img
            src={harryCover}
            alt="Portada del álbum Harry's House de Harry Styles"
            width="220"
          />
          <figcaption>
            <span lang="en">Harry's House</span> — Harry Styles
          </figcaption>
        </figure>
      </article>
    </section>
  );
}

export default FeaturedAlbums;