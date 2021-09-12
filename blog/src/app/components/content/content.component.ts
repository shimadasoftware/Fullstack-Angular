import { ARRAY_PAINTING } from './../../mocks/painting_mock';
import { Painting } from './../../models/painting';

import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public paintingSelected : Painting;
  public arrayPaintings : Painting[];
  public temporalBase64: any;
  public modalRef: BsModalRef;
  public modalTitle: string;
  public modalText: string;
  public modalContent: string;

  constructor(private modalService: BsModalService, private toastr: ToastrService) {
    this.paintingSelected = new Painting(0, 0, 0, '', '', '', '', '');
    this.arrayPaintings = ARRAY_PAINTING;
    this.modalRef = new BsModalRef;
    this.modalTitle = '';
    this.modalText = '';
    this.modalContent = '';
   }

  ngOnInit(): void {
  }

  public choose(tmpPlaces: Painting):void {
    this.paintingSelected = tmpPlaces;
  }

  public updatePainting(): void {
    if (this.paintingSelected.endingYear < this.paintingSelected.startYear || this.paintingSelected.description == ''
      || this.paintingSelected.paintingName == '' || this.paintingSelected.movement == '') {
      const parameters = {
        closeButton: true,
        enableHtml:true,
        progressBar:true,
        positionClass: 'toast-top-right',
        timeOut: 8000
      };
      this.toastr.error('Cannot modify. There is an empty field or the start date is greater than the end date.', 'WARNING', parameters);
    } else {
      this.paintingSelected = new Painting(0, 0, 0, '', '', '', '', '');
      this.modalRef.hide();
      this.toastr.success('Congratulations, the fields have been successfully updated. ', 'SUCCESS');
    }
  }

  public createPainting(): void {
    this.savePainting();
    this.paintingSelected = new Painting(0, 0, 0, '', '', '', '', '');
    this.modalRef.hide();
  }

  public savePainting(): boolean {
    if (this.paintingSelected.paintingName == '' || this.paintingSelected.description == ''
      || this.paintingSelected.startYear < 0
      || this.paintingSelected.endingYear < this.paintingSelected.startYear) {
      const parameters = {
        closeButton: true,
        enableHtml:true,
        progressBar:true,
        positionClass: 'toast-top-right',
        timeOut: 8000
      };
      this.toastr.error('Could not create a new register <br/> with empty or wrong fields', 'WARNING', parameters);
      return true;
    } else {
      this.paintingSelected.paintingID = this.arrayPaintings.length + 1;
      this.arrayPaintings.push(this.paintingSelected);
      this.toastr.success('Congratulations, the fields have been created successfully. ', 'SUCCESS');
    }
      return false;
  }

  public deletePainting(objPainting: Painting):void {
      this.arrayPaintings = this.arrayPaintings.filter(element => element != objPainting);
      this.paintingSelected = new Painting(0, 0, 0, '', '', '', '', '');
  }

  public btnDelete():void {
    this.deletePainting(this.paintingSelected);
    this.modalRef.hide();
  }

  public btnCancel(): void {
    this.modalRef.hide();
  }

  public choosePicture(input: any):any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      const parameters = {
        closeButton: true,
        enableHtml:true,
        progressBar:true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error('It is only enabled <strong>images<strong/>', 'WARNING', parameters);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.temporalBase64 = reader.result;

      this.paintingSelected.pictBase64 = this.temporalBase64;
      this.paintingSelected.picture = input.target.files[0].name;
    };
  }

  public openModalDelete(template: TemplateRef<any>, tempPainting: Painting):void {
    this.paintingSelected = tempPainting;
    this.modalRef = this.modalService.show(template, {class:'modal-md'});
    this.modalTitle = 'Warning';
    this.modalText = 'Do you really want to delete the picture field?';
    this.modalContent = this.paintingSelected.paintingName;
  }

  public openModalUpdate(template: TemplateRef<any>, tempPainting: Painting):void {
    this.paintingSelected = tempPainting;
    this.modalRef = this.modalService.show(template, {class:'modal-md'});
    this.modalTitle = 'Update';
    this.modalText = 'Modifiy the series of painting:';
    this.modalContent = this.paintingSelected.paintingName;
  }
}
