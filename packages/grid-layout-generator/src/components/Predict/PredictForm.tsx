import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, DatePicker, Form, InputNumber, message, Select } from 'antd';
import './style.less';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import { AxiosResponse } from 'axios';
import { useForm } from 'antd/es/form/util';
import { FormData, predict } from './predict';

export interface PredictProps {
  name?: string;
  job?: string;
  jobList?: string[];
  degree?: string;
  degreeList?: string[];
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const PredictForm: React.FC<PredictProps> = (props) => {
  const [form] = useForm();
  const { jobList, degreeList } = props;
  const { Option } = Select;
  const [submitEnable, setSubmitEnable] = useState<boolean>(true);
  const [birthday, setBirthday] = useState<{
    maleBirthday: string;
    femaleBirthday: string;
    disable: boolean;
  }>({
    maleBirthday: undefined,
    femaleBirthday: undefined,
    disable: false,
  });
  const [result, setResult] = useState<string>();

  useEffect(() => {});

  const onFinish = async (values: FormData) => {
    setSubmitEnable(false);
    message.loading('预测中……');

    try {
      const response: AxiosResponse = await predict(values);
      const { data, status, statusText } = response;
      if (status === 200 || statusText.toUpperCase() === 'OK') {
        const { result } = data;
        setResult(result);
        message.destroy();
        message.success(result);
      } else {
        message.error(statusText);
      }
    } catch (e) {
    } finally {
      setSubmitEnable(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // message.error(errorInfo);
    // console.error(errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <ConfigProvider locale={zhCN}>
      <Form
        form={form}
        {...layout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={
          {
            ageDiff: 0,
          } as Request
        }>
        <Form.Item {...tailLayout} label="男方" colon={false}>
          {null}
        </Form.Item>

        <Form.Item name={['male', 'degree']} label="学历" rules={[{ required: true, message: '请输入学历' }]}>
          <Select placeholder="请选择学历" size="middle">
            {degreeList.map((value, index) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name={['male', 'job']} label="工作" rules={[{ required: true, message: '请输入工作' }]}>
          <Select placeholder="请选择工作" size="middle">
            {jobList.map((value, index) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          // hidden
          name={['male', 'birthday']}
          label="出生日期"
          rules={[{ required: false, message: '请输入出生日期' }]}>
          <DatePicker
            onChange={(date: moment, dateString: string) => {
              setBirthday((prevState) => {
                let disable: boolean = false;
                if (dateString && prevState.femaleBirthday) {
                  disable = true;
                  form.setFieldsValue({
                    ageDiff: moment(dateString).diff(moment(prevState.femaleBirthday), 'y', true),
                  });
                }
                return { ...prevState, maleBirthday: dateString, disable };
              });
            }}
          />
        </Form.Item>
        <Form.Item {...tailLayout} label="女方" colon={false}>
          {}
        </Form.Item>
        <Form.Item name={['female', 'degree']} label="学历" rules={[{ required: true, message: '请输入学历' }]}>
          <Select placeholder="请选择学历" size="middle">
            {degreeList.map((value, index) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name={['female', 'job']} label="工作" rules={[{ required: true, message: '请输入工作' }]}>
          <Select placeholder="请选择工作" size="middle">
            {jobList.map((value, index) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          // hidden
          name={['female', 'birthday']}
          label="出生日期"
          rules={[{ required: false, message: '请输入出生日期' }]}>
          <DatePicker
            onChange={(date: moment, dateString: string) => {
              setBirthday((prevState) => {
                let disable: boolean = false;
                if (dateString && prevState.maleBirthday) {
                  disable = true;
                  form.setFieldsValue({
                    ageDiff: moment(prevState.maleBirthday).diff(moment(dateString), 'y', true),
                  });
                }
                return { ...prevState, femaleBirthday: dateString, disable };
              });
            }}
          />
        </Form.Item>
        <Form.Item name="ageDiff" label="年龄差" rules={[{ required: true, message: '请输入年龄差' }]}>
          <InputNumber precision={1} step={0.1} disabled={birthday.disable} />
        </Form.Item>
        <Form.Item name="marriedTime" label="结婚时间" rules={[{ required: true, message: '请输入结婚时间' }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item hidden={!result} label="结果" colon={false}>
          <div>{result}</div>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={!submitEnable}>
            预测
          </Button>
          <Button type="danger" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

PredictForm.defaultProps = {
  jobList: [
    '不便分类的其他从业人员',
    '专业技术人员',
    '军人',
    '农、林、牧、渔、水利业生产人员',
    '办事人员和有关人员',
    '商业、服务业人员',
    '国家机关、党群组织、企业、事业单位负责人',
    '生产、运输设备操作人员及有关人员',
  ],
  degreeList: [
    '中等职业教育',
    '其他',
    '初级中学教育',
    '大学本科/专科教育',
    '小学教育',
    '普通高级中学教育',
    '研究生教育',
  ],
};

export default PredictForm;
