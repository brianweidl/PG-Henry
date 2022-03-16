import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getObraDetail,
  getObrasRandon,
  getFavs,
  availablePainting,
  notAvailablePainting
} from "../../redux/actions/actions";
import styles from "./Detail.module.css";
import { AiFillEdit, AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useCart from "../../customHooks/useCart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../customHooks/useAuth";
import { addFav, deleteFav } from "../Favs/functionFavs";
import PaintingModal from "../../Modales/EditPainting/PaintingModal";

export const DetailOfArt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { add, cart, remove } = useCart();

  //Manejo de vista
  const { user } = useAuth();

  const { detailObra, obraRandon } = useSelector((state) => state);
  //console.log('detalles de la obra', detailObra)

  const favs = useSelector((state) => state.favs);
  const favsPaitings = favs.map(({ id }) => id).includes(detailObra?.id);

  //estado para manejar los favoritos
  const [isFavorite, setIsFavorite] = useState(favsPaitings);
  //estado para manejar la disponibilidad del la pintura
  const [isAvailable, setIsAvailable] = useState(false);
  console.log(isAvailable)
  useEffect(() => {
    dispatch(getObraDetail(id));
    dispatch(getObrasRandon(id));
    dispatch(getFavs());
  }, [id, dispatch, isFavorite]);

  useEffect(() => {
    setIsFavorite(favsPaitings);
  }, [favsPaitings, setIsFavorite]);

  async function handlePress(id) {
    setIsFavorite(!isFavorite);
    !isFavorite ? await addFav(id) : await deleteFav(id);
    dispatch(getFavs());
    //Agrego el dispatch del post del like
  }

  async function handleAvailable(id) {
    setIsAvailable(!isAvailable)
    !isAvailable ? await availablePainting(id) : await notAvailablePainting(id);
    dispatch(getObraDetail(id))
  }

  //console.log(detailObra);
  /////////////////////////////////
  const [page, setPage] = useState(1);
  const maximo = 4;

  //Estado para el modal
  const [openModal, setOpenModal] = useState(false);

  const handleIncrement = () => {
    setPage((prev) => Math.min(prev + 1, 3));
  };
  const handleDecrement = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // const handleReturn = () => {
  //   navigate(-1);
  // };

  const handleDetail = (id) => {
    dispatch(getObraDetail(id));
    navigate(`/detailpainting/${id}`);
  };

  //Son utilizados para el toastify
  const removeCart = () => {
    remove(parseInt(id));
    toast.success("Paint removed from the cart!");
  };

  const addCart = () => {
    add(parseInt(id));
    toast.success("Painting added to the cart!");
  };

  if (!detailObra || !obraRandon) {
    return <h1>Loading</h1>;
  }
  return (
    <div className={styles.containerDetail}>
      <ToastContainer
        position="bottom-center"
        theme="dark"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <PaintingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        ObraId={id}
      />
      <div className={styles.principalSectionInterno}>
        <div className={styles.internoimg}>
          <img src={detailObra.photos[0].url} alt="img" />
        </div>
        <div className={styles.internodescription}>
          <div className={styles.principalSectionArtist}>
            <div className={styles.principalSectionArtistImg}>
              <img src={detailObra.artist.photo} alt={detailObra.artist.name} />
            </div>
            <div className={styles.divContainerInfoDetail}>
              <div className={styles.divNameEmail1}>
                <p> {detailObra.artist.name} </p>
                <span>{detailObra.artist.email}</span>
              </div>
              <Link to={`/artists/${detailObra.artist.id}`}>
                <button>More about</button>
              </Link>
            </div>
          </div>
          <div className={styles.divContainerInfoObra}>
            <div className={styles.divContainerTitleFav}>
              <div className={styles.containerInfoObra}>
                <h1>{detailObra.title}</h1>
                <span className={styles.spanTech}>
                  {detailObra.techniques[0].name}
                </span>
                <span className={styles.spanDimensions}>
                  Dimensions {detailObra.width} x {detailObra.height},{" "}
                  {detailObra.orientation}
                </span>
              </div>
              {user.role === "user" ? (
                <button
                  onClick={() => handlePress(id)}
                  className={styles.buttonLikeObra}
                >
                  {isFavorite ? (
                    <AiTwotoneHeart className={styles.iconLike} />
                  ) : (
                    <AiOutlineHeart className={styles.iconLike} />
                  )}
                </button>
              ) : (
                <div></div>
              )}
              {user.role === "admin" ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className={styles.buttonLikeObra}
                >
                  <AiFillEdit className={styles.iconHeaderCardDetail} />
                </button>
              ) : (
                <div></div>
              )}
            </div>
            <span className={styles.spanPrice}>USD$ {detailObra.price}</span>
            <div>
              {detailObra.isAvailable !== "true" ?
              <span>Sold</span> :
              <span>Sale</span>
              }
              {user.role === 'admin' ? (
                <button onClick={() => handleAvailable(id)}>
                  {
                    isAvailable ? <p>Sold</p> : <p>sale</p>
                  }
                 </button>
              ) : <div></div>}
            </div>
           
            {user.role !== "admin" ? (
              cart.includes(parseInt(id)) ? (
                <button className={styles.btnCard} onClick={() => removeCart()} disabled={!detailObra.isAvailable}>
                  <div className={styles.cardImage}>-</div>
                  <div className={styles.cardText}>REMOVE FROM CART</div>
                </button>
              ) : (
                <button className={styles.btnCard} onClick={() => addCart()} disabled={!detailObra.isAvailable}>
                  <div className={styles.cardImage}>+</div>
                  <div className={styles.cardText}>ADD TO CART</div>
                  
                </button>
              )
            ) : (
              <div></div>
            )}
          </div>
          <div className={styles.divDescriptionArtwork}>
            <h4>About the work</h4>
            <span>{detailObra.description}</span>
          </div>
          <div className={styles.btnReturn}>
            <div className={styles.cardImageReturn}>
              <div></div>
            </div>
            <Link to='/gallery'>
            <div className={styles.cardImageReturn}>
              RETURN TO SEARCH
            </div>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.principalSectionObras}>
        <div
          onClick={handleDecrement}
          className={styles.obrasDetailDecrement}
        ></div>
        <div className={styles.obrasDetail}>
          {obraRandon
            ? obraRandon
                .slice((page - 1) * maximo, (page - 1) * maximo + maximo)
                .map((obra) => (
                  <div
                    onClick={() => handleDetail(obra.id)}
                    key={obra.id}
                    className={styles.obrasSimilares}
                  >
                    <img src={obra.image} alt="cards" />
                  </div>
                ))
            : ""}
        </div>
        <div
          onClick={handleIncrement}
          className={styles.obrasDetailIncrement}
        ></div>
      </div>
    </div>
  );
};
