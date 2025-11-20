import { useState, useEffect } from "react";
import { supabase } from "../../../../api/supabase/supabase";
import { CheckIcon, PlayIcon, PlusIcon } from "../../../../assets/Icons";
import { useUser } from "../../../../hooks/useUser";
import { useVisibilityObserver } from "../../../../hooks/useVisibilityObserver";
import { cleanTitle, GET_STATE_BACKGROUND } from "../../../helpers/constants/constants";
import { HomePageSkeleton } from "../../../helpers/Utils/Skeletons/HomePageSkeleton";

export function FriendsManager() {
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState([]);
  const [followingIds, setFollowingIds] = useState(new Set());
  const [userGames, setUserGames] = useState({});
  const [expandedUsers, setExpandedUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const visibleItems = useVisibilityObserver(".observed-item", 0.1);

  function obtenerImagen(juego) {
    if (typeof juego.imageUrl === "string" && juego.imageUrl.trim() !== "") {
      return juego.imageUrl;
    }
    if (Array.isArray(juego.url) && juego.url.length > 0 && typeof juego.url[0] === "string") {
      return juego.url[0];
    }
    return null;
  }

  function toggleExpand(email) {
    setExpandedUsers((prev) => ({
      ...prev,
      [email]: !prev[email],
    }));
  }

  function getAvatarUrl(fileName) {
    if (!fileName) return null;
    const { data } = supabase.storage.from("profileimages").getPublicUrl(fileName);
    return data?.publicUrl;
  }

  async function loadData() {
    if (!user?.id) return;
    setLoading(true);

    const { data: usersData, error: usersError } = await supabase
      .from("UserProfiles")
      .select("id, nickname, bio, email, profile_image_path")
      .neq("id", user.id)
      .order("nickname", { ascending: true });

    if (usersError) {
      console.error("Error al obtener usuarios:", usersError);
      setLoading(false);
      return;
    }

    const { data: followsData, error: followsError } = await supabase
      .from("follows")
      .select("followed_id")
      .eq("follower_id", user.id);

    if (followsError) {
      console.error("Error al obtener follows:", followsError);
      setLoading(false);
      return;
    }

    const followingSet = new Set(followsData.map((f) => f.followed_id));
    setAllUsers(usersData || []);
    setFollowingIds(followingSet);

    const followedEmails = usersData
      .filter((u) => followingSet.has(u.id))
      .map((u) => u.email);

    if (followedEmails.length === 0) {
      setUserGames({});
      setLoading(false);
      return;
    }

    const { data: juegosData, error: juegosError } = await supabase
      .from("Juegos")
      .select("titulo, infouser, imageUrl, url, plataforma, genero, estado, position")
      .in("infouser", followedEmails)
      .in("estado", ["Jugando", "Terminado"]);

    if (juegosError) {
      console.error("Error obteniendo juegos:", juegosError);
      setLoading(false);
      return;
    }

    const juegosPorEmail = {};

    for (const juego of juegosData) {
      const email = juego.infouser;
      if (!juegosPorEmail[email]) {
        juegosPorEmail[email] = { jugando: [], terminados: [] };
      }

      const juegoInfo = {
        titulo: juego.titulo,
        imageUrl: obtenerImagen(juego),
        plataforma: juego.plataforma,
        genero: juego.genero,
        position: juego.position,
      };

      if (juego.estado === "Jugando") {
        juegosPorEmail[email].jugando.push(juegoInfo);
      } else if (juego.estado === "Terminado") {
        juegosPorEmail[email].terminados.push(juegoInfo);
      }
    }

    for (const email in juegosPorEmail) {
      juegosPorEmail[email].terminados.sort((a, b) => b.position - a.position);
      juegosPorEmail[email].terminados = juegosPorEmail[email].terminados.slice(0, 4);
    }

    setUserGames(juegosPorEmail);
    setLoading(false);
  }

  async function followUser(targetId) {
    if (targetId === user.id) return alert("No puedes seguirte a ti mismo.");
    const { error } = await supabase.from("follows").insert([{ follower_id: user.id, followed_id: targetId }]);
    if (error) {
      alert("Error al seguir usuario.");
      console.error(error);
    } else {
      alert("Ahora sigues a este usuario.");
      await loadData();
    }
  }

  async function unfollowUser(targetId) {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", user.id)
      .eq("followed_id", targetId);
    if (error) {
      alert("Error al dejar de seguir.");
      console.error(error);
    } else {
      alert("Dejaste de seguir a este usuario.");
      await loadData();
    }
  }

  useEffect(() => {
    loadData();
  }, [user]);

  // if (loading) return <p className="text-white">Cargando...</p>;
  if (loading) return <HomePageSkeleton/>;


  return (
    <div className="flex flex-col items-start w-full min-h-screen p-4 pt-20 text-white lg:pr-40">
      <div className="pl-3 mb-8 lg:pl-40 text-start">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Comunidad de <span className="font-serif italic bg-purple-800">GameListWeb</span>
        </h2>
        <p className="max-w-xl mt-3 text-sm font-light text-gray-300 lg:text-lg">
          Explora perfiles de otros jugadores, descubre qué títulos están disfrutando ahora mismo y conecta con personas que comparten tu pasión por los videojuegos.
        </p>
        <p className="mt-2 text-sm italic text-gray-500">
          Porque cada partida cuenta una historia, y cada jugador deja huella.
        </p>
      </div>

      {allUsers.length === 0 ? (
        <p className="text-center text-gray-400">No hay otros usuarios registrados.</p>
      ) : (
        <ul className="w-full pl-3 space-y-6 lg:pl-40">
          {allUsers.map((userItem) => {
            const isFollowing = followingIds.has(userItem.id);
            const juegosJugando = userGames[userItem.email]?.jugando || [];
            const juegosTerminados = userGames[userItem.email]?.terminados || [];
            const isExpanded = expandedUsers[userItem.email];

            return (
              <li key={userItem.id} className="p-5 transition-shadow bg-gray-900 border border-gray-700 rounded-2xl hover:shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center justify-start gap-3 lg:gap-6">
                      <img
                        src={getAvatarUrl(userItem.profile_image_path)}
                        alt="Avatar"
                        className="object-cover w-10 h-10 rounded-full lg:w-16 lg:h-16 ring-2 ring-white"
                      />
                      <p className="text-sm font-semibold lg:text-lg">{userItem.nickname || "(sin nickname)"}</p>
                    </div>
                    <p className="text-xs italic text-gray-300 lg:text-sm lg:mt-3">{userItem.bio || "No hay bio de este usuario"}</p>
                  </div>

                  {isFollowing ? (
                    <button onClick={() => unfollowUser(userItem.id)} className="px-4 py-1.5 text-sm font-semibold text-red-400 border border-red-500 rounded-xl hover:bg-red-600/30 transition w-1/3 lg:w-40">
                      Dejar de seguir
                    </button>
                  ) : (
                    <button onClick={() => followUser(userItem.id)} className="px-4 py-1.5 text-sm font-semibold text-green-400 border border-green-500 rounded-full hover:bg-green-600/30 transition">
                      Seguir
                    </button>
                  )}
                </div>

                {isFollowing && juegosJugando.length > 0 && (
                  <div className="mt-4">
                    <button onClick={() => toggleExpand(userItem.email)} className="mt-2 text-sm text-purple-400 hover:underline">
                      {isExpanded ? <p className="flex items-center gap-2 mb-10">Ver menos</p> : <p className="flex items-center gap-2">Ver info <PlusIcon/></p>}
                    </button>
                    { isExpanded && 
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden`}>
                      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-300">
                        <div className={`rounded p-[3px] ${GET_STATE_BACKGROUND('Jugando')}`}><PlayIcon w={4} h={4}/></div><span>Jugando ahora:</span>      
                      </div>                
                      <ul data-id={'bloque-jugando'} className={`mt-4 grid gap-3 ${juegosJugando.length === 1 && 'grid-cols-1'} ${juegosJugando.length === 2 && 'lg:grid-cols-2 lg:gap-14'} ${juegosJugando.length === 3 && 'lg:grid-cols-3 lg:gap-8'} ${juegosJugando.length > 3 && 'lg:grid-cols-4 lg:gap-5'} observed-item relative transition duration-[2000ms] ease-out ${visibleItems['bloque-jugando'] ? "opacity-100 translate-y-0" : "opacity-0 lg:translate-y-20 translate-x-0"}`}>
                        {juegosJugando.map((juego, i) => (
                          <li key={i} className={`flex items-center h-full gap-3 lg:items-start lg:flex-col`}>
                            {juego.imageUrl && (
                              <img
                                src={juego.imageUrl}
                                alt={juego.titulo}
                                className={`object-cover rounded shadow-sm ${isExpanded ? "w-12 h-12 lg:rounded-2xl lg:w-full lg:h-80" : "w-12 h-12 lg:w-32 lg:h-20 lg:rounded-xl"}`}
                              />
                            )}
                            <div>
                              <p className="text-sm font-semibold text-white lg:text-base">{cleanTitle(juego.titulo)}</p>
                              <p className="text-xs text-gray-400 lg:text-sm">
                                {juego.plataforma || "Plataforma desconocida"} · {juego.genero || "Género desconocido"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div> }    
                  </div>
                )}

                {isFollowing && isExpanded && juegosTerminados.length > 0 && (
                  <div className="mt-6 transition-all lg:mt-10">
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-300">
                      <div className={`rounded p-[2px] ${GET_STATE_BACKGROUND('Terminado')}`}><CheckIcon w={5} h={5}/></div><span>Últimos terminados:</span>
                    </div>
                    <ul data-id={'bloque-terminados'} className={`observed-item transition duration-[2000ms] ease-out ${visibleItems['bloque-terminados'] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"} grid justify-center grid-cols-1 gap-3 overflow-hidden lg:grid-cols-4 lg:gap-6`}>
                      {juegosTerminados.map((juego, i) => (
                        <li key={i} className={`flex items-center gap-3 lg:items-start lg:flex-col`}>
                          {juego.imageUrl && (
                            <img
                              src={juego.imageUrl}
                              alt={juego.titulo}
                              className="object-cover w-12 h-12 rounded shadow-sm lg:rounded-xl lg:w-full lg:h-40"
                            />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-white lg:text-base">{cleanTitle(juego.titulo)}</p>
                            <p className="text-xs text-gray-400 lg:text-sm">
                              {juego.plataforma || "Plataforma desconocida"} · {juego.genero || "Género desconocido"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
