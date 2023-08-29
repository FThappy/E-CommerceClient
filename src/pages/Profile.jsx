import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcenment from '../components/Announcenment'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarToday, LocationOnOutlined, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase"
import { updateUser } from '../redux/apiCalls'

const Container = styled.div`
    
`
const User = styled.div`
  padding: 1.25rem;
`;
const UserTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserTitle = styled.h1``;
const UserContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;
const UserShow = styled.div`
  flex: 1;
  padding: 1.25rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 0.5rem;
`;
const UserShowTop = styled.div`
  display: flex;
  align-items: center;
`;
const UserShowImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;
const UserShowTopTitle = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 1.25rem;
`;
const UserShowUserName = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;
const UserShowUserTitle = styled.div`
  font-weight: 300;
`;
const UserShowBottom = styled.div``;
const UserShowTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(156, 154, 154, 0.849);
`;
const UserShowInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 1.25rem 0rem;
  color: #444;
`;
const UserShowInfoTitle = styled.div`
  margin-left: 0.65rem;
  font-size: 2rem;
`;
const UserUpdate = styled.div`
  flex: 3;
  padding: 1.25rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 0.5rem;
  margin-left: 1.25rem;
`;
const UserUpdateTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;
const UserUpdateForm = styled.form`display: flex;
    margin-top: 1.25rem;`;
const UserUpdateLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 18rem;
  column-gap: 2.5rem;
`;
const UserUpdateItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.65rem;
`;
const UserUpdateItemLabel = styled.label`
  margin-bottom: 0.3rem;
  font-size: 1.5rem;
`;
const UserUpdateItemInput = styled.input`
  border: none;
  width: 16rem;
  height: 2rem;
  border-bottom: 1px solid gray;
  font-size: 1rem;
`;
const UserUpdateRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 28rem;
`;
const UserUpdateUpload = styled.div`
  display: flex;
  align-items: center;
`;
const UserUpdateLab = styled.label``;
const UserUpdateInput = styled.input``;
const UserUpdateImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 0.65rem;
  object-fit: cover;
  margin-left: 1.25rem;
`;
const UserUpdateButton = styled.button`
  border-radius: 0.3rem;
  border: none;
  padding: 0.3rem;
  cursor: pointer;
  background-color: #33b249;
  color: whitesmoke;
  font-weight: 600;
`;

const Profile = () => {

  const user = useSelector((state)=>state.user.currentUser)
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [birth, setBirth] = useState(new Date());
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  if (!inputs.username) {
    setInputs((prev) => {
      return {
        ...prev,
        username: user.username,
      };
    });
  }
  if (!inputs.email) {
    setInputs((prev) => {
      return {
        ...prev,
        email: user.email,
      };
    });
  }
  if (!inputs.address) {
    setInputs((prev) => {
      return {
        ...prev,
        address: user.address,
      };
    });
  }
  if (!inputs.phone) {
    setInputs((prev) => {
      return {
        ...prev,
        phone: user.phone,
      };
    });
  }
  const handleBirth = (e) => {
    const selectedDate = new Date(e.target.value);
    setBirth(selectedDate);
  };
  const handleClick1 = () => {
    const id = user._id;
    const img = user.img;
    const accessToken=user.accessToken;
  
    if (!birth) {
      setBirth(user.birth);
    }
    const item = {
      _id: id,
      ...inputs,
      birth: birth,
      img: img,
      accessToken : accessToken,
    };
    updateUser(id, item, dispatch);
    {
      !error && navigate("/profile");
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const filename = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            const id = user._id;
            const accessToken = user.accessToken;
            if (!birth) {
              setBirth(user.birth);
            }
            const item = {
              _id: id,
              ...inputs,
              birth: birth,
              img: downloadURL,
              accessToken: accessToken,
            };
            updateUser(id, item, dispatch);
            // console.log({ ...inputs, img: downloadURL, categories: cat, size : size , color : color });
            {
              !error && navigate("/profile");
            }
          });
        }
      );
    } else {
      handleClick1();
    }
  };




  return (
    <Container>
      <Navbar />
      <Announcenment />
      <User>
        <UserTitleContainer>
          <UserTitle>Edit User</UserTitle>
        </UserTitleContainer>
        <UserContainer>
          <UserShow>
            <UserShowTop>
              <UserShowImg src={user?.img} />
              <UserShowTopTitle>
                <UserShowUserName>{user?.username}</UserShowUserName>
                <UserShowUserTitle>{user?.desc}</UserShowUserTitle>
              </UserShowTopTitle>
            </UserShowTop>
            <UserShowBottom>
              <UserShowTitle>Account Details</UserShowTitle>
              <UserShowInfo>
                <PermIdentity sx={{ fontSize: "2.5rem !important" }} />
                <UserShowInfoTitle>{user?.username}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <CalendarToday sx={{ fontSize: "2.5rem !important" }} />
                <UserShowInfoTitle>
                  {new Date(user?.birth).toLocaleDateString("en-GB")}
                </UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <PhoneAndroid sx={{ fontSize: "2.5rem !important" }} />
                <UserShowInfoTitle>{user?.phone}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <MailOutline sx={{ fontSize: "2.5rem !important" }} />
                <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
              </UserShowInfo>
              <UserShowInfo>
                <LocationOnOutlined sx={{ fontSize: "2.5rem !important" }} />
                <UserShowInfoTitle>{user?.address}</UserShowInfoTitle>
              </UserShowInfo>
            </UserShowBottom>
          </UserShow>
          <UserUpdate>
            <UserUpdateTitle>Edit</UserUpdateTitle>
            <UserUpdateForm>
              <UserUpdateLeft>
                <UserUpdateItem>
                  <UserUpdateItemLabel>UserName</UserUpdateItemLabel>
                  <UserUpdateItemInput
                    name="username"
                    placeholder={user?.username}
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Email</UserUpdateItemLabel>
                  <UserUpdateItemInput
                    name="email"
                    placeholder={user?.email}
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Birth</UserUpdateItemLabel>
                  <UserUpdateItemInput
                    name="birth"
                    placeholder={new Date(user?.birth).toLocaleDateString(
                      "en-GB"
                    )}
                    onChange={handleBirth}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Phone</UserUpdateItemLabel>
                  <UserUpdateItemInput
                    name="phone"
                    placeholder={user?.phone}
                    onChange={handleChange}
                  />
                </UserUpdateItem>
                <UserUpdateItem>
                  <UserUpdateItemLabel>Address</UserUpdateItemLabel>
                  <UserUpdateItemInput
                    name="address"
                    placeholder={user?.address}
                    onChange={handleChange}
                  />
                </UserUpdateItem>
              </UserUpdateLeft>
              <UserUpdateRight>
                <UserUpdateUpload>
                  <UserUpdateImg src={user?.img} alt="a" />
                  <UserUpdateLab htmlFor="file">
                    <Publish sx={{ fontSize: "2.5rem !important" }} />
                  </UserUpdateLab>
                  <UserUpdateInput
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    nChange={(e) => setFile(e.target.files[0])}
                  />
                </UserUpdateUpload>
                <UserUpdateButton onClick={handleClick}>
                  Update
                </UserUpdateButton>
              </UserUpdateRight>
            </UserUpdateForm>
          </UserUpdate>
        </UserContainer>
      </User>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Profile