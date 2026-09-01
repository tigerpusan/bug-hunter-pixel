class WeaponRule{final String name;final bool instantHit;const WeaponRule(this.name,{this.instantHit=true});}
const weapons=[WeaponRule('권총'),WeaponRule('장총'),WeaponRule('투척'),WeaponRule('젓가락')];
WeaponRule weaponForWave(int wave)=>wave>=10?weapons[3]:wave>=7?weapons[2]:wave>=4?weapons[1]:weapons[0];
