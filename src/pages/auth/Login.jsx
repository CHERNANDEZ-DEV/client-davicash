import React, { useState, useEffect } from 'react';
import bg2 from '../../assets/bg_4.jpg';
import logo from '../../assets/Davivienda-Logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, fetchUserAuthorities, user } = useAuth();

    const [dui, setDui] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ dui: '', password: '', credentials: '' });

    /* ───────────────────────────── Navegar si ya hay sesión */
    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    /* ───────────────────────────── Validaciones */
    const DUI_REGEX = /^\d{9}$/;
    const PWD_MIN_LENGTH = 4;

    const validateFields = () => {
        const newErrors = { dui: '', password: '' };

        /* DUI */
        if (!dui.trim()) {
            newErrors.dui = 'Este campo es obligatorio.';
        } else if (!DUI_REGEX.test(dui)) {
            newErrors.dui = 'La cantidad de caracteres no es válida.';
        }

        /* Contraseña */
        if (!password.trim()) {
            newErrors.password = 'Este campo es obligatorio.';
        } else if (password.length < PWD_MIN_LENGTH) {
            newErrors.password = `La contraseña debe tener al menos ${PWD_MIN_LENGTH} caracteres.`;
        }

        setErrors(prev => ({ ...prev, ...newErrors, credentials: '' }));
        return !newErrors.dui && !newErrors.password; // true = no errores
    };

    /* ───────────────────────────── Envío */
    const handleLogin = async e => {
        e.preventDefault();

        if (!validateFields()) return;

        setIsLoading(true);
        try {
            const session = await login({ dui, password });

            if (session.status !== 200) {
                setErrors(prev => ({ ...prev, credentials: 'Credenciales incorrectas.' }));
                return;
            }
            await fetchUserAuthorities();
        } catch (err) {
            console.error('Error during login:', err);
            setErrors(prev => ({ ...prev, credentials: 'No fue posible completar la operación. Vuelva a intentarlo.' }));
        } finally {
            setIsLoading(false);
        }
    };

    /* ───────────────────────────── UI */
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg2})` }}
        >
            <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
                {/* Logo */}
                <div className="mb-6 flex items-center justify-center p-2 bg-white rounded-lg border-gray-200">
                    <img src={logo} alt="Logo de la empresa" className="h-20 object-contain" />
                </div>

                {/* Mensaje de cabecera */}
                {/* <p className="text-center mb-4">Por favor ingrese sus credenciales</p> */}

                {/* Formulario */}
                <form onSubmit={handleLogin} noValidate>
                    {/* DUI */}
                    <div className="mb-4">
                        <input
                            type="number"
                            id="dui"
                            name="dui"
                            value={dui}
                            onChange={e => setDui(e.target.value)}
                            placeholder="DUI"
                            pattern="\d{9}"
                            maxLength={9}
                            className="w-full px-3 py-2 border rounded-md font-montserrat"
                            required
                        />
                        {errors.dui && <p className="mt-1 text-red-600 text-sm">{errors.dui}</p>}
                    </div>

                    {/* Contraseña */}
                    <div className="mb-4">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            minLength={PWD_MIN_LENGTH}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                        {errors.password && <p className="mt-1 text-red-600 text-sm">{errors.password}</p>}
                    </div>

                    {/* Error de credenciales */}
                    {errors.credentials && (
                        <div className="mb-4 text-red-600 text-center">{errors.credentials}</div>
                    )}

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full ${isLoading ? 'bg-gray-500' : 'bg-red-800 hover:bg-red-700'
                            } text-white py-2 px-4 shadow-lg rounded-4xl flex items-center justify-center transition cursor-pointer`}
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Procesando...
                            </>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
