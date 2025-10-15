import { useState } from "react";
import { FaLock } from "react-icons/fa";

export const SecurityPlaceholder = ({ title }) => {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    function saveNewPassword(event) {
        event.preventDefault();
        
        if(newPassword !== confirmNewPassword){
            console.log("erro senha");
            return;
        }
         console.log(currentPassword);
         console.log(newPassword);
         console.log(confirmNewPassword);

         setCurrentPassword("");
         setConfirmNewPassword("");
         setNewPassword("");
    
    }
    return (
        <section className="flex justify-center items-center mt-8">
            <div className="flex flex-col items-center w-full max-w-xs">
                <div>
                    <FaLock size={60} color="#F69027" />
                </div>
                <div>
                    <h2 className="text-[#000000] mt-5 font-semibold">Alterar Senha</h2>
                </div>
                <div className="mt-2">
                    <form >
                        <label className="text-black text-[15px]"
                            htmlFor="currentPassword">Senha atual</label><br />
                        <input className="bg-[#D9D9D9] w-[320px] h-[40px] pl-3 mt-1 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded"
                        type="password"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                         /><br />

                        <label className="text-black text-[15px]"
                            htmlFor="currentPassword">Nova senha</label><br />
                        <input className="bg-[#D9D9D9] w-[320px] h-[40px] pl-3 mt-1 mb-2
                     border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                     rounded"
                            type="password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                             /><br />

                        <label className="text-black text-[15px]"
                            htmlFor="currentPassword">Confirmar nova senha</label><br />
                        <input className="bg-[#D9D9D9] w-[320px] h-[40px] pl-2 mt-1 mb-2
                        border-2 border-gray-300 focus:outline-none focus:border-[#F69027]
                        rounded"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(event) => setConfirmNewPassword(event.target.value)}
                             /><br />


                        <button type="submit" className="w-[180px] h-[50px]
                    bg-[#F69027] mt-2 text-black rounded-[8px] cursor-pointer
                    hover:bg-[#fa820a] "
                    onClick={saveNewPassword}
                        >Salvar Nova Senha
                        </button>


                    </form>
                </div>
            </div>

        </section>
    )
}
