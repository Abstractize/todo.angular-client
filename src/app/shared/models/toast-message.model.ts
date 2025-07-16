import { ToastType } from './toast-type.model';

export interface ToastMessage {
    text: string;
    type: ToastType;
}
