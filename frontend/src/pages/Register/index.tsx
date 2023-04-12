import React, { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';

import useInput from '@hooks/useInput';

import MainPage from '@layouts/MainPage';
import HashTagBox from '@components/Register/HashTagBox';
import FindPostcode from '@components/Register/FindPostcode';
import ImageUpload from '@components/Register/ImageUpload';
import Checkbox from '@components/Register/Checkbox';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  TitleBox,
  CampainInfoBox,
  InputBox,
  ButtonBox,
  BusinessNumberInput,
  InputLabel,
  TextInput,
  DateInput,
  RedStar,
  Tilde,
  Button,
  SubmitButton,
} from '@pages/Register/index.styles';

interface ICampaignInfo {
  campaignDescription: string;
  campaignType: string;
  category: string;
  channelType: string;
  content: string;
  expEndDateTime: string;
  expStartDateTime: string;
  imageUrls: string[];
  location: string;
  name: string;
  noticeDateTime: string;
  recruitNumber: string | number;
  regStartDateTime: string;
  regEndDateTime: string;
  searchTags: string[];
  siteUrl: string;
}

const Register = () => {
  const RegisterMutation = useMutation(
    (CampaignInfo: ICampaignInfo) => axios.post('http://118.67.133.214:8080/api/campaign', CampaignInfo),
    {
      onSuccess: (res) => {
        console.log(res);
        window.alert('새로운 캠페인이 등록되었습니다.');
        navigate('/');
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const navigate = useNavigate();
  const [businessNumber, onChangeBusinessNumber] = useInput('');
  const [hashTag, onChangeHashTag, setHashTag] = useInput('');

  const [campaignDescription, onChangeCampaignDescription] = useInput('');
  const [campaignType, , setCampaignType] = useInput('');
  const [category, setCategory] = useState('');
  const [channelType, , setChannelType] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [expEndDateTime, onChangeExpEndDateTime] = useInput('');
  const [expStartDateTime, onChangeExpStartDateTime] = useInput('');
  const [mainImage, setMainImage] = useState([]);
  const [detailImage, setDetailImage] = useState([]);
  const [location, , setLocation] = useInput('');
  const [name, onChangeName] = useInput('');
  const [noticeDateTime, onChangeNoticeDateTime] = useInput('');
  const [recruitNumber, onChangeRecruitNumber] = useInput('');
  const [regStartDateTime, onChangeRegStartDateTime] = useInput('');
  const [regEndDateTime, onChangeRegEndDateTime] = useInput('');
  const [searchTags, setSearchTags] = useState([]);
  const [siteUrl, onChangeSiteUrl] = useInput('');

  const handleBusinessNumberBtn = () => {
    window.alert('시연을 위해 인증코드를 비활성화 해놓았습니다.\n그냥 진행하시면 됩니다.');
  };

  const handleHashTagKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && hashTag !== '') {
      setSearchTags((v) => [...v, hashTag]);
      setHashTag('');
    }
  };

  const handleSummit = () => {
    // const imageUrls = [...mainImage, ...detailImage];
    const regStart = new Date(regStartDateTime).toISOString().split('.')[0];
    const regEnd = new Date(regEndDateTime).toISOString().split('.')[0];
    const expStart = new Date(expStartDateTime).toISOString().split('.')[0];
    const expEnd = new Date(expEndDateTime).toISOString().split('.')[0];
    const notice = new Date(noticeDateTime).toISOString().split('.')[0];
    const regNum = +recruitNumber;

    const CampaignInfo = {
      campaignDescription,
      campaignType,
      category,
      channelType,
      content,
      expEndDateTime: expEnd,
      expStartDateTime: expStart,
      imageUrls: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdbd1Kv11NZNsL9m2gon-EHK31N8rUG10hLpAfH4rqTQ&s',
      ],
      location,
      name,
      noticeDateTime: notice,
      recruitNumber: regNum,
      regStartDateTime: regStart,
      regEndDateTime: regEnd,
      searchTags,
      siteUrl,
    };

    RegisterMutation.mutate(CampaignInfo);
  };

  return (
    <MainPage>
      <Container>
        <TitleBox>
          <h1>캠페인 등록하기</h1>
          <p>사업자등록번호 인증 후 양식을 작성해 주세요.</p>
        </TitleBox>

        <CampainInfoBox>
          <InputBox>
            <InputLabel htmlFor="businessNumber">사업자등록번호 인증하기</InputLabel>
            <RedStar>*</RedStar>

            <BusinessNumberInput
              value={businessNumber}
              onChange={onChangeBusinessNumber}
              type="text"
              name="businessNumber"
              id="businessNumber"
              placeholder="1234-5678 을 입력해주세요."
            />
            <Button onClick={handleBusinessNumberBtn}>인증하기</Button>
          </InputBox>
        </CampainInfoBox>

        <CampainInfoBox>
          <InputBox>
            <InputLabel htmlFor="title">제목</InputLabel>
            <RedStar>*</RedStar>
            <TextInput
              value={name}
              onChange={onChangeName}
              type="text"
              name="title"
              id="title"
              placeholder="제목을 입력해 주세요."
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="service">제공 상품</InputLabel>
            <RedStar>*</RedStar>
            <TextInput
              value={content}
              onChange={onChangeContent}
              type="text"
              name="title"
              id="title"
              placeholder="리뷰어에게 제공하는 상품을 입력해주세요."
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="detail">소개</InputLabel>
            <RedStar></RedStar>
            <TextInput
              value={campaignDescription}
              onChange={onChangeCampaignDescription}
              type="text"
              name="detail"
              id="detail"
              placeholder="캠페인 소개"
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="headCount">총 모집 인원</InputLabel>
            <RedStar>*</RedStar>
            <TextInput
              value={recruitNumber}
              onChange={onChangeRecruitNumber}
              type="number"
              id="headCount"
              name="headCount"
              placeholder="N명"
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="mission">리뷰어 미션</InputLabel>
            <RedStar>*</RedStar>
            <TextInput
              value={siteUrl}
              onChange={onChangeSiteUrl}
              type="text"
              id="mission"
              name="mission"
              placeholder="https://"
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="keyword">필수키워드</InputLabel>
            <RedStar>*</RedStar>
            <div>
              <TextInput
                type="text"
                name="keyword"
                id="keyword"
                placeholder="키워드를 입력 후 엔터를 추가해주세요."
                value={hashTag}
                onChange={onChangeHashTag}
                onKeyPress={handleHashTagKeydown}
              />
              <HashTagBox tagList={searchTags} />
            </div>
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="">SNS 유형</InputLabel>
            <RedStar>*</RedStar>
            <Checkbox onChangeType={setChannelType} type="snsType" />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="">유형선택</InputLabel>
            <RedStar>*</RedStar>
            <Checkbox onChangeCategory={setCategory} onChangeType={setCampaignType} type="campaignType" />
          </InputBox>
        </CampainInfoBox>

        <CampainInfoBox>
          <InputBox>
            <InputLabel htmlFor="applyStart">신청기간</InputLabel>
            <RedStar>*</RedStar>
            <DateInput
              value={regStartDateTime}
              onChange={onChangeRegStartDateTime}
              type="date"
              name="applyStart"
              id="applyStart"
              data-placeholder="YYYY-MM-DD"
              required
              aria-required="true"
            />
            <Tilde>~</Tilde>
            <DateInput
              value={regEndDateTime}
              onChange={onChangeRegEndDateTime}
              name="applyEnd"
              id="applyEnd"
              type="date"
              data-placeholder="YYYY-MM-DD"
              required
              aria-required="true"
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="experienceStart">체험기간</InputLabel>
            <RedStar>*</RedStar>
            <DateInput
              value={expStartDateTime}
              onChange={onChangeExpStartDateTime}
              type="date"
              name="experienceStart"
              id="experienceStart"
              data-placeholder="YYYY-MM-DD"
              required
              aria-required="true"
            />
            <Tilde>~</Tilde>
            <DateInput
              value={expEndDateTime}
              onChange={onChangeExpEndDateTime}
              name="experienceEnd"
              id="experienceEnd"
              type="date"
              data-placeholder="YYYY-MM-DD"
              required
              aria-required="true"
            />
          </InputBox>
          <InputBox>
            <InputLabel htmlFor="announce">발표일</InputLabel>
            <RedStar>*</RedStar>
            <DateInput
              value={noticeDateTime}
              onChange={onChangeNoticeDateTime}
              type="date"
              name="announce"
              id="announce"
              data-placeholder="YYYY-MM-DD"
              required
              aria-required="true"
            />
          </InputBox>
        </CampainInfoBox>

        <CampainInfoBox>
          <InputBox>
            <InputLabel htmlFor="adress">주소</InputLabel>
            <RedStar>*</RedStar>
            <FindPostcode onChangeAddress={setLocation} />
          </InputBox>

          <InputBox>
            <InputLabel htmlFor="">대표이미지</InputLabel>
            <RedStar>*</RedStar>
            <ImageUpload type="single" setImage={setMainImage} />
          </InputBox>

          <InputBox>
            <InputLabel htmlFor="">상세이미지</InputLabel>
            <RedStar>*</RedStar>
            <ImageUpload type="multiple" setImage={setDetailImage} />
          </InputBox>
        </CampainInfoBox>
        <ButtonBox>
          <SubmitButton onClick={handleSummit}>등록하기</SubmitButton>
          <SubmitButton
            onClick={() => {
              navigate('/');
            }}
          >
            작성취소
          </SubmitButton>
        </ButtonBox>
      </Container>
    </MainPage>
  );
};

export default Register;
