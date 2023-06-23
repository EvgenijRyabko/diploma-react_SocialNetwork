import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

// Show message before user has been exited from account
// getPopup :: () -> void
const getPopup = async () => {
  let timerInterval;

  const { isConfirmed, isDenied, isDismissed } = await Swal.fire({
    title: 'Ваша сессия истекла!',
    html: `Для того что-бы обезопасить ваши данные, ваша сессия была прервана.
    Вы будете возвращены на страницу авторизации через <b></b> секунд.`,
    background: '#607d8b',
    color: 'white',
    iconColor: 'white',
    timer: 5000, // 5 seconds
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
        b.textContent = Math.round(Swal.getTimerLeft() / 1000);
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });

  if (isConfirmed || isDismissed || isDenied) {
    const cookies = new Cookies();
    await cookies.remove('auth-token', { path: '/' });
    await cookies.remove('id-user', { path: '/' });
    window.location.href = '/';
  }
};

// Attach the token to the request header each time the server is contacted
axios.interceptors.request.use((config) => {
  const cookies = new Cookies();
  if (cookies.get('auth-token')) config.headers['auth-token'] = cookies.get('auth-token');
  return config;
});

// If the token is expired, then issue a message and exit the system
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 419) {
      await getPopup();
      return Promise.resolve(error);
    }
    return Promise.reject(error);
  },
);
