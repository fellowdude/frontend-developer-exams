import { Component, TemplateRef } from '@angular/core';
import { IToast } from '../../interfaces/toast.interface';
import { ToastService } from '../../services/internal/toast/toast.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss'],
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
})
export class ToastMessageComponent {
  constructor(public toastService: ToastService) {}

	isTemplate(toast: any) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}
