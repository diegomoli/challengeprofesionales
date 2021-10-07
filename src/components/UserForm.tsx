import { FunctionComponent, useContext, useEffect } from 'react';
import { Button, Select, Upload, message } from 'antd';

import { IProfesssional } from '../interfaces/professionals.interface';
import { Form, Input } from 'antd';
import { FormValues, LanguageOption } from '../interfaces/form.interface';
import { UploadOutlined } from '@ant-design/icons';
import { UserContext } from '../context/UserContext';
import { ErrorMessage } from './ErrorMessage';
type UserFormProps = {
    dataProfessional?: IProfesssional;
    defaultValues?: number[];
    dataLenguage: LanguageOption[] | undefined;
    submitAction: (data: FormValues) => void;
};
export const UserForm: FunctionComponent<UserFormProps> = ({
    dataProfessional,
    defaultValues,
    dataLenguage,
    submitAction
}) => {
    /*eslint no-template-curly-in-string: "off"*/

    const { errorMessage } = useContext(UserContext);
    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        form.setFieldsValue({
            first_name: dataProfessional?.first_name,
            email: dataProfessional?.email,
            last_name: dataProfessional?.last_name,
            professionalLanguages: defaultValues
        });
    }, [dataProfessional, form, defaultValues]);

    const validateMessages = {
        required: 'El ${label} es obligatorio',
        types: {
            email: 'El email ingresado no es válido!'
        },
        string: {
            range: 'El campo ${label} debe tener entre ${min} y ${max} caracteres'
        }
    };
    const props = {
        maxCount: 1,
        beforeUpload: (file: File) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' || file.type === 'image/png';

            if (!isJpgOrPng) {
                message.error(
                    ` El archivo ${file.name} no es una imágen con extensión jpg o png`
                );
            }

            const isLt2M = file.size / 1024 / 1024 < 3;
            if (!isLt2M) {
                message.error('La imágen no debe pesar más de 3 MB ');
            }
            return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE;
        },
        onChange: (e: any) => {
            form.setFieldsValue({
                profile_image: e.fileList[0]?.originFileObj
            });
        }
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                autoComplete="off"
                onFinish={submitAction}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Nombre"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 1,
                            max: 30
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            type: 'string',
                            min: 1,
                            max: 30
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="profile_image"
                    label="Subir foto de perfil"
                    valuePropName="file"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Subir Imagen</Button>
                    </Upload>
                </Form.Item>
                {/* <Form.Item label="Foto de Perfil:">
                    <FileInput name="profile_image" />
                </Form.Item> */}
                <Form.Item label="Idiomas" name="professionalLanguages">
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Seleccionar idioma"
                        optionLabelProp="label"
                        // defaultValue={defaultValues}
                        options={dataLenguage}
                    />
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Aceptar
                    </Button>
                    {errorMessage && (
                        <ErrorMessage errorMessage={errorMessage} />
                    )}
                </div>
            </Form>
        </div>
    );
};
