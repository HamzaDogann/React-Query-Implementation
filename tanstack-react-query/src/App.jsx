import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import './App.css'
import { useState } from 'react';

function App() {

  return (
    <>
      <AllUsers />
    </>
  )
}

//======= TanStack React Query Implementation =======

//! ---- Methods ----

//? useQuery -> Get işlemlerinde kullanılır yani fetch yapacağımız zaman useQuery,
//todo: useMutation -> PUT, POST, DELETE gibi işlemleri yapacağımız zaman yani bir endpoint'e data göndereceğimiz zaman kullanacağımız function

function AllUsers() {

  const [username, setUsername] = useState('');

  const queryClient = useQueryClient(); //!Query Depomuzun bu fonksiyonda kullanmak için useQueryClienti kullanıyoruz.


  //--------------------------- useQuery ---------------------------

  //!Başlıca useQuery objeleri

  //todo?| Data -> useQuery ile yapacağımız işlemden dönen veriyi tutan objedir.
  //todo| isLoading -> İlk fetch işleminde işlem devam ederken işlemin devam ettiğini gösteren bir loading durumunun boolean değerini tutan objedir.
  //todo| isFetching -> Refetch yapıldığı zaman yani cache üzerinde olan ama güncel olmadıgını düşündüğüm veriyi tekrar fetch yapmak istediğimizde loading durumunu gösteren boolean obje tipidir..
  //todo!| isError -> Fetch işleminde bir hata meydana geldiği zaman isError{true} olarak bize hatanın olduğunu gösterecek boolean metotdur.
  //todo!| error -> Fetch işleminde bir hata meydana geldiği zaman olan hatanın mesajını tutan obje.
  //todo| refetch -> Verilerin güncellenmesi veya manuel olarak yeniden getirilmesi gerektiğinde kullanılabilecek bir fonksiyondur. "onClick={()=> refetch()}" gibi bir button ile kullanılabilir.
  //todo?| isSuccess -> Sorgunun başarılı bir şekilde tamamlandığını gösteren bir boolean değerdir. Sorgunun hatasız bir şekilde tamamlanıp tamamlanmadığını belirlemek için kullanılır.

  const { data, isLoading, isFetching } = useQuery(['users'], () => {
    return fetch('https://crudcrud.com/api/28e5ba7161e249d9bb48908219ad4447/posts')
      .then((res) => res.json());
  },
    {
      onSuccess: (users) => {
        setUsername(users[0].username);
      }
    });


  //--------------------------- useMutation ---------------------------

  const updateUserMutation = useMutation((username) => {
    return fetch(`https://crudcrud.com/api/28e5ba7161e249d9bb48908219ad4447/users/55757575755}`, {
      method: 'PUT',
      body: JSON.stringify({
        username: username
      }),
      headers: {
        'Content-type': 'application/json; charset-UTF-8'
      }
    }
    )
  }, {
    //? İşlem Başarılı Olduğunda,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      //! queryClient depomuza useQuery ile beraber bir queryKey belirlemiştik.( 'users' ) bunu geçersiz kıl ve yeniden işleme sok anlamı taşıyan bir kod bloğudur.
    }
  })

  //--------------------------- handleFormSubmit ---------------------------

  //! updateUserMutation fonksiyonu asenkron bir işlemi yaptığı için form submit yaptıktan sonra gelen veriyi asenkron işlem olarak ele alıp async await yapıları ile ele almak gerekir.
  //todo| const {data} => username parametresini gönderdikten sonra updateUserMutation da yapılan işlemlerden dönen veriyi alır.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { data } = await updateUserMutation.mutateAsync(username);
    setUsername(data[0].username);
  }


  return (
    <>
      {
        isLoading || isFetching
          ? <h1>Loading...</h1>
          : <div>
            <h1>Kullanıcı Id : {data[0].id}</h1>
            <h1>Kullanıcı Adı : {data[0].username}</h1>

            <form onSubmit={(e) => handleFormSubmit(e)}>
              <input onChange={(e) => setUsername(e.target.value)} value={username}></input>
              <button type='submit'>Güncelle</button>
            </form>
          </div>
      }
    </>
  )
}

export default App
