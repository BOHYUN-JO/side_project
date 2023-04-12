import React, { useState } from 'react';

import { CheckBoxWrapper, CheckBoxLabel, CheckBoxItem, SelectTag } from '@components/Register/Checkbox/index.style';

interface CheckboxProps {
  type: string;
  onChangeType: (t: string) => void;
  onChangeCategory?: (t: string) => void;
}

const Checkbox = ({ type, onChangeType, onChangeCategory }: CheckboxProps) => {
  const deliveryCategory = ['생활', '서비스', '유아동', '디지털', '뷰티', '패션', '도서', '식품', '반려동물'];
  const regionCategory = ['맛집', '뷰티', '숙박', '문화', '배달', '테이크아웃', '기타'];
  const [curCampaignType, setCurCampaignType] = useState('');

  const handleSnsTypeCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const currentCheck = e.target;
    const allCheckbox = document.getElementsByName('snsType') as NodeListOf<HTMLInputElement>;

    for (let i = 0; i < allCheckbox.length; i++) {
      if (allCheckbox[i] !== currentCheck) {
        allCheckbox[i].checked = false;
      } else {
        allCheckbox[i].checked = true;
        onChangeType(allCheckbox[i].value);
      }
    }
  };

  const handleCampaignTypeCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const currentCheck = e.target;
    const allCheckbox = document.getElementsByName('campaignType') as NodeListOf<HTMLInputElement>;

    for (let i = 0; i < allCheckbox.length; i++) {
      if (allCheckbox[i] !== currentCheck) {
        allCheckbox[i].checked = false;
      } else {
        allCheckbox[i].checked = true;
        onChangeType(allCheckbox[i].value);
        setCurCampaignType(allCheckbox[i].value);
      }
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeCategory(e.target.value);
  };

  return (
    <div>
      {type === 'snsType' && (
        <CheckBoxWrapper>
          <CheckBoxLabel>
            <CheckBoxItem type="checkbox" name="snsType" value="BLOG" onClick={handleSnsTypeCheckbox} />
            블로그
          </CheckBoxLabel>
          <CheckBoxLabel>
            <CheckBoxItem type="checkbox" name="snsType" value="INSTAGRAM" onClick={handleSnsTypeCheckbox} />
            인스타그램
          </CheckBoxLabel>
        </CheckBoxWrapper>
      )}
      {type === 'campaignType' && (
        <CheckBoxWrapper>
          <CheckBoxLabel htmlFor="">
            <CheckBoxItem type="checkbox" name="campaignType" value="VISIT" onClick={handleCampaignTypeCheckbox} />
            지역형
          </CheckBoxLabel>
          <CheckBoxLabel htmlFor="">
            <CheckBoxItem type="checkbox" name="campaignType" value="DELIVERY" onClick={handleCampaignTypeCheckbox} />
            배송형
          </CheckBoxLabel>
          {curCampaignType === 'VISIT' && (
            <SelectTag onChange={handleCategory}>
              {regionCategory.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </SelectTag>
          )}
          {curCampaignType === 'DELIVERY' && (
            <SelectTag onChange={handleCategory}>
              {deliveryCategory.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </SelectTag>
          )}
        </CheckBoxWrapper>
      )}
    </div>
  );
};

export default Checkbox;
