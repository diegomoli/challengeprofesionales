export interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    profile_image: File;
    professionalLanguages: number[];
}

export interface LanguageOption {
    key: number;
    label: string;
    value: number;
}
