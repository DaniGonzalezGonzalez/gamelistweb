import { useEffect, useState } from "react";
import { Link } from "react-router";
import { supabase } from "../../../../api/supabase/supabase";
import { AbandonadoIcon, ArchiveIcon, ArrowRight, CheckIcon, CompleteIcon, EditIcon, PauseIcon, PlayIcon, ProximosIcon, StartIcon, UpdateIcon } from "../../../../assets/Icons";
import { useUser } from "../../../../hooks/useUser";
import { AVATAR_OPTIONS, cleanCollectionUrlName, GET_STATE_BACKGROUND } from "../../../helpers/constants/constants";
import { DeleteAccount } from "./DeleteAccount";
import { FriendsManager } from "./FriendsManager";
import { HomePageSkeleton } from "../../../helpers/Utils/Skeletons/HomePageSkeleton";

export function UserProfile() {
  const { user } = useUser();
  const [profile, setProfile] = useState({ nickname: "", bio: "", profile_image_path: "" });
  const [editField, setEditField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorNickname, setErrorNickname] = useState(null);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false); // Nuevo estado

  function getAvatarUrl(fileName) {
    if (!fileName) return null;
    const { data } = supabase.storage.from("profileimages").getPublicUrl(fileName);
    return data?.publicUrl;
  }

  useEffect(() => {
    if (!user?.id) return;

    async function fetchProfile() {
      setLoading(true);
      const { data, error } = await supabase
        .from("UserProfiles")
        .select("nickname, bio, profile_image_path")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile({
          nickname: data.nickname || "",
          bio: data.bio || "",
          profile_image_path: data.profile_image_path || "",
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  async function handleSave() {
    setSaving(true);
    setErrorNickname(null);

    const { error } = await supabase
      .from("UserProfiles")
      .update(profile)
      .eq("id", user.id);

    if (error) {
      if (error.code === "23505" && error.message.includes("nickname")) {
        setErrorNickname("Este nickname ya está en uso.");
      } else {
        console.error("Error actualizando perfil:", error.message);
        alert("Error al guardar.");
      }
    } else {
      alert("Perfil actualizado.");
      setEditField(null);
      setShowAvatarOptions(false); // Opcional: cerrar al guardar avatar
    }
    setSaving(false);
  }

  const renderEditableField = (field, label) => (
    <div className="text-sm text-white">
      <span className="font-semibold text-gray-300">{label}: </span>
      {editField === field ? (
        <span className="inline-flex items-center gap-2">
          {field === "bio" ? (
            <textarea
              value={profile[field]}
              onChange={(e) =>
                setProfile({ ...profile, [field]: e.target.value })
              }
              rows={2}
              className="px-2 py-1 text-black rounded resize-none"
            />
          ) : (
            <input
              type="text"
              value={profile[field]}
              onChange={(e) =>
                setProfile({ ...profile, [field]: e.target.value })
              }
              className="px-2 py-1 text-black rounded"
            />
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            title="Guardar"
            className={`text-xl ${
              saving ? "opacity-50 cursor-not-allowed" : "hover:text-green-400"
            }`}
          >
            💾
          </button>
        </span>
      ) : (
        <span
          className="inline-flex items-center gap-2 cursor-pointer hover:underline"
          onClick={() => setEditField(field)}
          title="Editar"
        >
          {profile[field] || <em className="text-gray-400">Sin {label.toLowerCase()}</em>} 
          <div>
            <EditIcon w={5} h={5}/>
          </div>
        </span>
      )}
      {field === "nickname" && errorNickname && (
        <p className="mt-1 text-xs text-red-500">{errorNickname}</p>
      )}
    </div>
  );

  // if (loading) return <div>Cargando perfil...</div>;
  if (loading) return <HomePageSkeleton/>;
  

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen pt-20 pb-10 bg-center bg-cover"
      style={{ backgroundImage: `url("/Imagen-fondo-colecciones.jpg")` }}
    >
      {/* <h1 className="w-full pl-48 mb-8 text-4xl font-light text-white uppercase text-start">Mi perfil</h1> */}
      <div className="w-full mb-8 px-7 sm:px-12 lg:pl-48 lg:text-start">
        <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Mi <span className="font-serif italic bg-purple-800">Perfil</span>
        </h2>
        <p className="max-w-xl mt-3 text-sm font-light text-gray-300 lg:text-lg">
          Editar el nickname que verá el resto de la comunidad, describe una pequeña bio sobre ti y accede todas tus listas de videojuegos.
        </p>
        <p className="mt-2 text-sm italic text-gray-500">
          ¡Y elige tu avatar favorito!
        </p>
      </div>

      <div className="w-[88%] xl:w-[80%] bg-gray-900 bg-opacity-75 shadow-xl rounded-xl flex flex-col lg:flex-row items-center justify-between border border-gray-700">
        <div className="flex flex-col gap-6 p-8">
          <h2 className="overflow-hidden text-xs font-bold text-gray-300 lg:text-sm">Cuenta: {user.email}</h2>
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <p className="font-bold text-white">Avatar:</p>
            {profile.profile_image_path ? (
              <img
                src={getAvatarUrl(profile.profile_image_path)}
                alt="Avatar"
                className="w-24 h-24 border-2 border-white rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 text-white bg-gray-700 rounded-full">
                Sin avatar
              </div>
            )}
            {/* Botón para mostrar/ocultar opciones */}
            <button
              onClick={() => setShowAvatarOptions(!showAvatarOptions)}
              className="px-3 py-1 mt-2 mb-5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {showAvatarOptions ? "Cerrar opciones de avatar" : "Cambiar avatar"}
            </button>
            {/* Opciones de avatar, solo visibles si showAvatarOptions es true */}
            {showAvatarOptions && (
              <div className="grid grid-cols-5 gap-3 mt-3">
                {AVATAR_OPTIONS.map((avatar) => (
                  <img
                    key={avatar}
                    src={getAvatarUrl(avatar)}
                    alt={avatar}
                    onClick={() => setProfile({ ...profile, profile_image_path: avatar })}
                    className={`w-12 h-12 rounded-full cursor-pointer hover:ring-4 hover:ring-green-400 ${
                      profile.profile_image_path === avatar ? "ring-4 ring-blue-400" : ""
                    }`}
                  />
                ))}
              </div>
            )}
            {/* Solo mostrar botón de guardar avatar si opciones visibles */}
            {showAvatarOptions && (
              <button
                onClick={handleSave}
                className="px-2 py-1 mt-2 text-sm text-white bg-purple-600 rounded hover:bg-purple-700"
                disabled={saving}
              >
                Guardar avatar seleccionado
              </button>
            )}
          </div>
          {renderEditableField("nickname", "Nickname")}
          {renderEditableField("bio", "Bio")}
        </div>
        <div className="w-full my-10">
          <h2 className="pl-5 mb-3 text-sm text-white">Mis <span className="italic bg-purple-700">listas</span> de juegos</h2>
          <div className="grid grid-cols-1 gap-2 text-[10px] sm:grid-cols-3 sm:text-sm px-6">
            {[
              { label: "Jugando", sublabel: "Pasando ahora mismo", color: GET_STATE_BACKGROUND('Jugando'), icon: <PlayIcon/> },
              { label: "Completando", sublabel: "A por el 100%", color: GET_STATE_BACKGROUND('Completando'),  icon: <CompleteIcon/> },
              { label: "Terminados", sublabel: "Los que he jugado", color: GET_STATE_BACKGROUND('Terminado'),  icon: <CheckIcon/> },
              { label: "Próximos", sublabel: "Lo que voy a jugar", color: GET_STATE_BACKGROUND('Próximos'),  icon: <ProximosIcon/> },
              { label: "Otra vez", sublabel: "¡Quiero repetir!", color: GET_STATE_BACKGROUND('Otra vez'), icon: <UpdateIcon/> },
              { label: "Lista de deseos", sublabel: "¡Lo quiero!", color: GET_STATE_BACKGROUND('Lista de deseos'),  icon: <StartIcon/> },
              { label: "Pausados", sublabel: "Dándole una vuelta", color: GET_STATE_BACKGROUND('Pausado'),  icon: <PauseIcon/> },
              { label: "Abandonados", sublabel: "No pienso volver", color: GET_STATE_BACKGROUND('Abandonado'),  icon: <AbandonadoIcon/> },
              { label: "Todos", sublabel: "Mi biblioteca completa", color: "bg-cyan-600",  icon: <ArchiveIcon/> },
            ].map(({ label, sublabel, color, icon }) => (
              <Link key={label} to={`/edit-game-to-list-${label === 'Todos' ? cleanCollectionUrlName('completa') : cleanCollectionUrlName(label)}`} className={`rounded-xl text-white hover:scale-105 transition-all duration-300 flex items-center justify-center text-center`} title={`Ver juegos: ${label}`}>                
                <div className="flex items-center justify-between w-full gap-5 p-2 mt-1 transition duration-300 rounded lg:p-2 sm:gap-1 xl:gap-5 xl:px-3 hover:bg-gray-800">
                  <div className="flex items-center gap-3">
                      <div className={`p-1 ${color} rounded`}>{icon}</div>
                      <div className="text-start">
                          <h3 className="text-xs uppercase xl:text-sm">{label}</h3>
                          <p className="pt-1 text-[11px] lg:text-xs text-gray-200 font-light">{sublabel}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                      <div className="py-1 pl-3 text-white"><ArrowRight/></div>
                  </div>
              </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* <FriendsManager /> */}
      <DeleteAccount />
    </div>
  );
}
