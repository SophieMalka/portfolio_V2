import './admin.css';
import Portrait from '../../assets/img/portrait.jpeg';

function Admin() {
    const login = async (event) => {
        event.preventDefault();

        const loginForm = document.querySelector('form');
        const formData = new FormData(loginForm);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                const { token } = await response.json();
                sessionStorage.setItem('token', token);
                window.location.replace('/admin2103/projects');
            } else if (response.status === 401) {
                loginForm.email.value = '';
                loginForm.password.value = '';
                alert("Erreur dans l'identifiant ou le mot de passe");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Une erreur s'est produite lors de la connexion");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la connexion :", error);
        }
    };
    return (
        <section id='admin'>
            <img className='portrait' src={Portrait} alt='Sophie Malka' />
            <div className='connexion'>
                <h1 className='connexion-title'>Administrateur</h1>
                <form className="connexion-form">
                    <label className='label-form-connect' htmlFor="email">Adresse email</label>
                    <input className='input-form-connect' type="email" id="email" name="email" required />
                    <label className='label-form-connect' htmlFor="password">Mot de passe</label>
                    <input className='input-form-connect' type="password" id="password" name="password" required />
                    <div className='content-button-admin'>
                        <button className='button-form-connect' type="submit" onClick={login}>
                        Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
};

export default Admin;