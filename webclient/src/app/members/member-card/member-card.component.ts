import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  imageLoading: boolean = true;

  constructor(private memberService: MembersService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onLoad() {
    this.imageLoading = false;
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => this.toastr.success('You have liked ' + member.knownAs));
  }
}
