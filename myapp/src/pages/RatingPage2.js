// import MessagesList from '../components/MessagesList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../apis/firebase";
import NavBar from "../components/navBar";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../apis/firebase";
import { useEffect, useState } from "react";
import RateStaring from "../components/RateStaring";
import RateType from "../components/RateType";
import Carousel from 'react-bootstrap/Carousel'

const RatingPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [messages, setmessages] = useState([]);

  const getData = async () => {
    await db.collection("Commitment").onSnapshot((query) => {
      const msgs = [];
      query.forEach((element) => {
        msgs.push({ ...element.data(), id: element.id });
        //console.log({...element.data(),id:element.id});
      });
      setmessages(msgs);
    });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!user && loading) {
    return <Loading />;
  }
  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <>
      <NavBar />
      <div className="container mt-4">
        <div class="alert alert-dismissible alert-success">
          <strong>Instruciones!</strong> Aqui den ir las intrucciones y una
          breve explicacion de las metricas a usar
          <a href="#" class="alert-link">
            this important alert message.
          </a>
        </div>
        <Carousel>
          {
            messages.map((msg, index)=>{
              return (
                <Carousel.Item >
                  Mensaje {index + 1}:
                  <div className="alert alert-dismissible  alert-light">
                    <strong>{msg["message"]}</strong>
                  </div>
                  <RateStaring />
                  <RateType/>
                </Carousel.Item>
              );
            })
          }

        </Carousel>
      </div>
      <ToastContainer />
    </>
  );
};

export default RatingPage;
