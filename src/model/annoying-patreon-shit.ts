export class PatreonStatusDto {
  patreonId = '';
  status = '';
  pledgeAmount = -1;
}

export class RelationShip {
  data: RelationData = new RelationData();
  included: IncludedData[] = [];
}

export class RelationData {
  id = '';
  type = '';
  relationships: {
    memberships: MemberRelationshipRelationData;
  } = {
    memberships: new MemberRelationshipRelationData(),
  };
}

export class MemberRelationshipRelationData {
  data: {
    id: string;
    type: string;
  }[] = [];
}

export class IncludedData {
  id = '';
  type = '';
  attributes: {
    patron_status: string;
    will_pay_amount_cents: number;
  } = {
    patron_status: '',
    will_pay_amount_cents: -1,
  };
}
