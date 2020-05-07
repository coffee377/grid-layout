import { Moment } from 'moment';
import axios from 'axios';

export interface Gender {
  degree: string;
  job: string;
  birthday?: Moment;
}

export interface FormData {
  /**
   * 男性
   */
  male: Gender;
  /**
   * 女性
   */
  female: Gender;
  /**
   * 双方年龄差
   */
  ageDiff: number;
  /**
   * 结婚时间
   */
  marriedTime: Moment;
}

const predict = async (values: FormData, precision: number = 2) => {
  const { male, female, marriedTime, ageDiff } = values;

  /* 根据双方出生日期自动计算年龄差 */
  // if (male.birthday && female.birthday) {
  //   ageDiff = male.birthday.diff(female.birthday, 'y', true);
  // }

  const data = {
    OP_DATE: marriedTime.format('YYYY-MM-DD'),
    AGE_DIFF: ageDiff,
    JOB_MAN: male.job,
    DEGREE_MAN: male.degree,
    JOB_WOMAN: female.job,
    DEGREE_WOMAN: female.degree,
  };

  console.log('发送数据', data);
  return axios.post('/predict/result', data, {});

  // return Promise.resolve(3000)
  //   .then((value) => {
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => resolve(), value);
  //     });
  //   })
  //   .then((value) => {
  //     return { result: '预计正常', message: '' };
  //   });
};

const test = (params: any) => {
  return '预计正常';
};

export { predict };
