/* Where I've worked: a line-art world map.
   Coastlines and borders are Natural Earth data (public domain), simplified and encoded as integer steps on a
   1600-unit grid in the Natural Earth projection. Countries I've worked in are hatched; the cities are marked. */
(function () {
  'use strict';
  var host = document.getElementById('worked-map');
  if (!host || !document.createElementNS) return;

  var DATA = {"arcs":"186,dv,xwuyqvxrxv|0,do,wx~18c,ds,swvtCs|qh,bh,MGvyBA|r4,c0,tCyAuDzF|r8,cu,jBiv|qj,d0,rkru|qb,co,mr|q2,ck,qlul|pw,c0,Bpuq|q1,bp,xrts|q1,bi,Lu||l6,7d,vDhvvIrwuFevux||k5,88,FvzkBpBkGuvs|8p,49,ooptynstxrssxs|8d,3g,BqqrwnsokzuqptX0Gj|8x,1i,HzXpwxBszACstyGtNzyxoyAvJuwyBtttytDvyyExGuwszuzxszHnrryqBsBxxAqyBvsACrxyszxyFoyqEwzxqzuAnymvlDgAtyrwhEoEAwvDAuNFFvsFvAzADownttDsEpvnssCqxjLuBCCvsFzyLlBLszCADyvzzytAcF6vkBiGHoKqyxqzvEAyCuApvzxx5HsuwrDrkw|eo,4t,tsxoqtiHivlCnvtwvydCutCnwmpnjoivltvrtx0v0v0vev|ds,2f,Etpzst|ex,15,ttytGyjw||du,w,sxotDsxy|e2,m,ovCv|dx,h,xwtxovxsAv|ea,y,juwqlsxtKxxwtxzwQvDxmybv|cm,j,ywtwlvEt|cp,h,ywmvBu|g7,3x,oDytxwtxExtyyvwAsAruvqqAsvzsrujvysutFkCrxvuw|dz,23,CyuxzwsxpsjAwsqvztBnAy|ez,17,ztFAuwCuxyCxyBoxHzyzBvkEooqwtxDBvAsykqBEfqstxumqkxtuzrJvxrCquslryuoqmx8stuAtqvxrFpEuryvxBsEtyAtxCu|dp,10,Hw9CxpDt|bd,r,MqFuoAbw|82,3k,zupFupys|d8,f,IxvyftAusuwu|8l,4b,nutqruvsFwzE|ba,y,Hwzy0FrwvtptJnutHu|co,s,BvqzaxqvwuDtcvIqLzurAuxvvy|ci,14,xxsCEznxwxtxkt4yvtoutrOuduutFultErGsywrxEtyyAsxxuzytxrBv|d1,16,tsBtEvqyzxszlwoqDv|cj,12,Cwpxtswv|dk,p,wxqApvsvxspwyrJu|e6,a,JtFyyzhzkvttztotys|ep,6,_sEu_wOvazCv9BcxzvswwxeAAxlx3uwtCuvsFxorHsstvtMvdupr|ez,1t,owyqBwty|d4,1j,wxsxlsDszx|f6,45,Bvyyms|f3,4j,wxCwrxqtws|eo,4t,vweEtzwyyuuxeyDvmwpFtsvBqBxrupuAsuyxuH2RuCxMsEsvtrslxrropwqrhxvAfspwiEtF|ah,7l,ntqfptszrtoibxholw|8c,6m,rnosr2AiEhzhBwvAzl|36,8f,xyqzvqwsxw|||||59,2p,xwrxstAu|6b,31,xwlAutEr|8d,3g,ssxqtrwrmuopitnrqwtyezIlaEvxpz6F0C_kyuKmlxvtsxwsnxArutqwssysutzsFqLsvsAuewruurNqyvsyCvsmstzt_nJszwwxDv_zwv|56,29,Dxrxptxt|vu,48,tyswxAtxntvFmyCEswxy|ve,57,pshvottwvyotsy|ub,57,mEuspvurtvuqprjwekmyzO|sn,5c,mqpy|s8,5a,uqqtpnzwvrCvtnnuoy|rq,4m,poosxlAyurCpBvKBytHxCuvtorAqrswtJtIqCwyAFwvxHruwPMwsByBuOE|ub,57,xwsyHzryrv|ue,5i,tuvsqwtCruvyywxzuA|u5,5y,pu|tz,5x,vskqmpsqpurqpspAxxqv|13u,bq,LBBECywyrvvzCExuvyBzrxmsokptpyvzrxou|13s,co,x0vs|15a,bv,xAuwtqopwuCB|154,c7,nxpswtBwxsvyxvzrvsyvvyrB|15j,c4,ADsttp|13s,co,rqkwAptlcmsyuqstDtuupvnoEsCxwGAyEmLA|11s,cm,vy|11s,cp,szrvxqAt|12y,cc,xnwzsz|10y,ar,szzAuyAzqwuDqztIvtpyurptqxttpuuorquqyn|zx,b2,zBGrzxzuAgEw|12e,br,AwwzrtmvwsBv|122,bw,rsAuuz|127,b1,zAvAsuvCslxp|11l,b8,AuAssBcwuzzzGruyuupAzCxGtwtuyqqxuuwtssvqswvJswttwlssBdzrEy|117,cu,przuzytx|11c,cl,CsuyoxquvtBw|10y,ck,yuwxkxBqwx|zr,ca,wwDwwtDxxzHzqx0oquutrvyqGy|z9,bi,yBywxytKqvmmh8rngcFwKLzvzzBCtzzx|eu,iy,ABHzuxpu|f4,j9,pvrk|fc,fq,vO|fc,g9,vyBzvzyxsFqxiwyFpxqtuxxAywxuxxpAvDsvsyvzEzvAryuBszzD|et,iw,itrprtsqyttbwuoiwusexuslxrwmpgwgzntizsvp|e1,en,zqAwyzxrBw|el,ek,EEJBwyrDIwzrvq|fm,f2,xuyyvAgM|f4,j9,syjsdlLBwpBu|dn,dw,CEuAAIyv|et,iw,oywztwfnmdvqyrotyrtmAxuksuwBsvuarkxvx6rdxot0vusf||q2,ck,nvszvJAxwArvnnpwnq|p7,cx,nwubntswtAovqkdw||nr,c6,yq|nu,c1,BuxxBoxlAozb|oj,au,vrzrJAxsCtIu|pn,al,yzDuAB|q3,au,uBxwpDuF|px,bj,tD|pv,br,wE|rf,bl,srvczp|rg,as,DpBvHf|s6,a6,Aovl|sb,9p,EsvCpPiPgJoF|qh,bh,uqBlqj|qh,aq,Bo|qn,aj,xwxADzCwArAx|rf,bl,pAqF|pa,a5,qsvpsp|p2,9q,tntwzezwua|p5,8i,vtAvvk|pa,85,_vQv|qq,85,zNzy|qy,8q,pBtI|qq,99,tFoFuF|qg,a3,rdtusxxzqCptrzlvqqswtCswyx|p2,9q,qysBlxwxrzjy|o5,aa,tnrrvtBvrg|o1,9h,vtsvtpxoBrxbrqun|o1,81,As_Nzx|df,8h,uE|de,8q,juwtEvtrtuwtBw|df,8h,DwCAtxmurzut|u1,9,JwGyxz9slsAt|v0,f,FzfwwqAv|yi,r,Sywyfwlsusyu|zg,v,FwnwntuuCw|yz,13,ztExiv|pz,a,Pvlxlt|on,3i,jv|ob,3i,wtAt|oh,3e,Bxvx|r3,11,BrtuLqPsyx3EpDxzDyhvnsusyvusAssu|11i,3l,TTotxDEEqrvzsrialjxtstzx||114,57,usxvplytAwtenypvknntfgkslwuxzzvErypt|z0,44,lurynxmvnqivptsshrtAyyty9qgC|vv,47,uw|rq,4m,nEFK|rs,5a,syps|rj,5a,rr7q|qr,51,gmBqstBtrv|qh,4j,xrzvumcqtssvspow|po,3t,srAtnourls|p7,39,qp|p2,33,wl||p3,2p,Gjpsvssswrqqyrpsvs|oy,1l,Dt|p6,1j,yuLyMCwynzcsBzxBDytrwtFyxusrCrCxwspnFwyxrwwxyxAuvsMpxvtyMsAyysqswu_DwsmsroBmEwxyuyBAxBAxrFAvAostvspsvqpsAsssAxwzzwssztJynnPtrtxsLsStwsBtIAHuIywylzHwzyAtYyssHwVHuqCxPvprxt_yxvNBPuJCSuFzyuoq_y~55,1m,CDsxwxyrEwxzjynAoswtovxsqwqz~13x,24,txquOGnumzqBwxmsqzrtuxpvxCCyBCrwxzzxqxyBrwxAtA99rouqAuBhrorvxzqAnqnwtDByixtrovtx8vkQKAwtzvFAFTuGqKrypsrB|5j,1b,Cwkx~12x,1e,tt|pz,4o,wuAy|q5,4q,Cwuxmzsuwsquzr||cu,7f,yxuztp|cr,7p,xztytrxs|fl,iu,Frzxpytusxst|ni,e,BtJzoxqCrvosyuhoJv|oy,1l,vsruqwrAistw|o6,1l,tvvypvuxsvlKvysvtzwBxyuArB|nd,2w,ssoBqwqtsfOjJgJmItzsHuHyqwAy|oj,c,jydrLuJx|od,k,pxpuxutuBuBx|if,3,Us_vyvMy0xuvUvxwsxRtFx7zCvoAuzzykwBxvzrvzzovyxuwmwyAnuDzwypwprvyrxIwcChxlBaBnEpyvzpDqwrrnvnivosrxruuApBuzqlxruyqFworpuArrmruwtos8worKtdtWqxtnuQrvt_tCvLxpuwt|tu,id,Bysypvyp|11s,cm,GtkA|o7,fh,xtxyAxBswb|on,ex,zGyvDnzxBuClFn|pt,ej,Dw|q1,ek,yGuD|q3,f3,rutByyys||q7,f8,rFcQlBhvkAorunwqof|pp,fj,rvqAyzAsyrtt|ah,7l,oNBOBzJrytymKsvypJtu||b9,8r,nvuytvzBpvsD|at,98,poruny2hpptqyptokhwqlivjstsusEENwHxwxzsyvsoowolmArrqtf|fc,fq,yuKGyytyxy|fx,g9,pBjsss|fm,f2,vmrvsnlttl|f3,e9,xlrqvqnvsieoqqumqwoApv|dl,cx,qvvosymrwtqnzrwoEpzw|di,bz,xesmyvwtsuvsEvwuyz|dv,b6,yxyvFortvotuCxFrwr|en,al,ywxBtBxAAyArzv|f6,b2,xwvrCw|ff,b0,CwBl|fs,ar,wuzHxwvzszwxDvvBzrIAxBAuKxIFCxzGuEfQuUpRrAjxjDsAvKfW|f3,e9,rrjwtJ|dn,dw,ypsnxjrm|dk,e0,4bg0roopwttqAo|c7,bu,uAzvxyBlAtApwo|ct,bd,DBxAGvyxsBzy|ct,bd,rsqvoq|cd,b5,xoBpuuwmso|ci,ab,zrur|cl,a3,DrwpysCvDoxxux|dd,9n,oCtBxwyGDvyzFvsExBtxzE|ci,ab,tqwurrqzwztwtwrqqu|bw,a5,vpxu|by,9y,AzGrCA|bw,a5,nmuxstwp|bl,9q,Ew|bu,9r,zC|bl,9q,nmwv|be,9h,HlDu|by,96,rQ||bc,9e,vtps|b6,99,Bo|bc,92,JuDA|bc,9e,sxos||b9,8r,vF||b2,9d,mq|bd,8o,uFsy|dd,9n,sxwHyrupAtxrCDEvAyysGurxxxywyxwzzx|es,a5,rywyrxuzyz|es,a5,GH|f3,ah,rFCG|f3,ah,Kw|fi,ai,sAxBtC|fi,ai,zxBC|mw,47,DxtC|n2,4g,svsAvxxuxx|n0,4o,xH|n2,50,synupwuy|mk,56,kvmq|m0,51,xswlonptvsHvtpzxErwrzu|mi,3y,CBAx|mu,46,xw|n8,56,xtvDtuvq|c7,bu,xrutuxstvpzlAs|e3,8o,ywtwpwwszv|cp,8o,Ayovttzu|c7,7z,CwByzvCCzwuwCxfyysrttrhruuxugzIo|pt,ej,psuqpprn|pc,dx,DwElBs|pz,dl,vxzvCztOoF|on,ex,vgAvwcFtwxCs||o7,fh,qos4k6|no,du,DuxxOuyyGwDs|p3,dv,zuzx|k5,9d,spAo|k7,90,DtAyBC|kq,98,yG|kt,9j,lv|kj,9j,iw||k5,9g,Itqtnw|kq,98,xrAwAtMvt0udCv|ln,7q,_TzyvzAu|mr,8k,vHsChy|ma,96,ovmDrvqEuC|lk,9u,jw|l8,9v,qkrxpuvt|l6,7d,MI|k7,90,wasr||mg,ag,ugrows|mc,9r,Bq|mi,9m,ytyy|mo,9n,wEqDvH||nz,9j,qpsyptmyqtqwprpxtE|mi,9m,vrqusk|mr,8k,BtXb|np,7y,EAyt|nz,9j,wAsznPsxqtrysD|na,an,kynlov|o5,aa,rBvDCH|o8,b0,vyis|nv,b0,nv|nn,b0,nv|nf,b0,wrpm||md,ah,q5||md,ah,hCrt|lv,am,tpzkto|lv,9y,voIv|lk,9u,Azyuyw|lv,am,nuhz|l9,ap,woqrwp|l6,a8,yqtpwt|l6,a8,sxsptv|ky,a4,rnpwsA|kl,a2,mk|kc,9r,Crvr|kc,9r,po|l9,ap,qtkl|kt,ad,Am|kt,ad,oqup|oj,au,puqC|pa,a5,IL||nq,c2,rq|nm,bx,ysusztwsBywtvntsxpruuq|nm,bx,lgyk|nf,b7,Dvvo|nf,b7,vo|qb,co,yCrMxw|qc,dd,hzwz|p3,dv,poweEvvl|qj,d0,uGAAvCsAsrvnqs|r8,cu,xStyqCmAjGxQszkBwB|||no,du,xgCfp4|pv,br,Bt||qg,6n,tuvzvxxv|qg,6s,uF|qf,72,rm|qb,6t,yl|||qe,6j,yn|qh,6b,xxtA|sd,d5,yMuwusuxvBk_rGnzpstjwnxuymulypDsBpwqxwAmwx|||nd,6y,tlopyc|n7,5z,AtywvxytuzwDsyBB|nl,6j,vzpAvAtw|l6,7c,wpJoCrvrFssf|lz,68,KoLuztEw|nd,6y,xCtKzExuBB|qg,6l,AxDq|qt,6i,yB|qw,6o,mzzAtxqAqu||si,7u,FvDl|t0,7k,wx|t1,7m,wz|t2,7q,tvwztwuC|sy,82,http|se,7r,woxD||rz,70,xC|s1,77,ns|rt,74,yqyw|qt,6i,Epvlzr|r6,5y,Fv|rg,5y,CDtEzAAyCI||rt,74,nvikjq|t2,7q,ABBwBCqFswvBrxtztvrAow|ss,8x,pj|sm,8l,Iqxkss|||16u,dm,vpxBtv|yy,9l,uoxrFv|z9,9a,zxwrAx|zj,9a,wFozxyny|z7,9u,ruqn|yy,9l,nsvrsvsNCIDC|yz,ag,qyvsqt|yp,ae,omuyvj|yh,9w,zlslqoxqnjyoDs|yi,8e,yzywvFEryvzzwAAAuC|yi,8e,yp|yl,88,yxupxu|yp,83,BEAvyzrzByHJxE|yh,9w,ufmboBquujrnoq|xj,8c,vo|xj,85,xuumzwwqwlzszwup|xx,79,yuzAxDszvBAvxzywuAByytvx|yp,83,FtysByyAzx|zf,88,qzsEMPzNeLuswrrt||115,58,uutzxzpAvyBy|114,5q,oA|10x,5v,otvopt|10k,5k,BlCxtsAtvszy|114,5q,DFxEmypjxurr|z0,44,vExxBwytFCmvrAnzouuyzzrzfzrycpdvonbqsngmsr|xj,85,sntystznktuspsuzzxszyxyG|x3,85,vxnwwztypzkHvynyvYtvtzxxrxsAqqi0spo3pysuopxtttqr|uj,7x,xrFvpkstzpAvEfusysrsqnxtGvyr|vd,67,BByCvxsvxBHC|vx,6z,sCKCRAuo|wu,7b,xuwz|wx,7e,AyFusq|x9,7b,zvCnzxysxzuxAw|xj,8c,pkrvvApu|wx,7e,ApCy|vx,6z,AvNFFx|uj,7x,rtpnax|to,7p,wpBssolm|ti,70,DyLswoFsurzrsrzwxptqwsJs|v0,5y,BCCx|u5,5y,BvAoBEArDw|uz,5x,ww|ti,70,yrvrrusowh|tf,66,CwwtAsvrzsyx|ue,5i,uxruvyMv|uq,5m,yAzwxA|ve,57,oBqwuyovrA|tf,66,tremnwpz|si,5y,umrtvrtvvrzwytqpsxvyts|rg,5y,qjyu|re,5l,CA||rm,5q,Bqvzzy|rw,5s,xzDzBvBt|to,7p,dsqnozptmqojqutx|qh,6b,vp|qh,65,wqHvHt|rl,5q,srru|re,5l,qsur|r8,5e,Bu|re,5d,zAuxzxwz|o6,1l,GAyE|ok,1z,pwsywyjDtCCBsAswsIrutzqvne|po,3t,rwuybsox|os,3w,tj|oq,3k,Duyqvt|p1,3c,Bs|qh,4j,mxsxvy|pz,4o,ouutsvrC|pk,4s,pu|pe,4r,xqzvvupnqusw|p6,4d,oxnv|||op,49,vtAqtp|op,49,hs|ob,46,fn|nv,3y,qi|nq,3l,IqDx||o4,4d,vxswvz|o1,4k,mx|ns,4m,osow||na,4g,Jwurys|nq,4a,ywytCx||or,4f,pDrw|oh,4o,qw|oc,4p,ms||o4,4d,yxHrAw|pe,4r,uooo|pk,4s,sxuB|pg,50,qtoxlutt|os,4x,km||og,3a,JtCz|og,3a,woyuzyyvvr|or,31,Gx|or,31,vtruvsLt|nv,3y,kABC|na,4g,nv|mw,47,vr|mw,43,vs|mw,40,uqztvp|mz,3n,zuytuq|n5,3f,Av|na,3f,zABtBy|pg,50,sBxy|pf,59,nw|p7,5a,wxiv|ov,5c,sq|os,57,xrtp|pb,68,pxptwtGx|p7,5a,ywtz|p8,5f,lwyytvquyAuxzywyruwytvxAotog|ok,5l,yp|on,5f,Ds|qh,65,ttwtpusypwrsrvrxrtqvpnxrsszqBvxrDwEqCvIAEvzs|qz,5b,Ey|pf,59,zAqvqzus|ok,5l,rsvm|||ol,5a,xA|oc,4p,xyux|od,4u,jtuxHG||oc,56,kqqntuuxts|nr,4r,Cvwrzu|ne,4k,vxqvuxnv|||ml,3x,BvAy|ml,3x,AmEu|l7,59,ytwyBuwyqExDtA|ld,5y,pxvnstzkup|l7,59,uqArUw|mk,56,wyrzpwrEwymGmvqyrqru|lk,3l,wysAoypuyquqDo|lf,3e,vBAw|16i,ee,zBrvpkBA||16c,cq,rozC|168,cs,ruvszz|164,ci,wyopBy||16m,h5,nCrxutAqvtssAsAnuhxuyzuGxrvAxxDuhH|15h,hn,SguzzttzkEuxnxmEnymtwtQj|137,h9,xwnHutqzsuyhAxCt|117,g0,mzrAfwlApvprCkwhsdxyvqxyulBivzHlPqCnAmxzxuttxsxwDkCtzBBvvsBlEtwtstxuHBBtxxqBrDOJyuBjxhAmyPytyzvQFCwGzvuBBEvztGlNbQpFcDqsxsnAlrulrsypnzEjjFttullq7y|wf,a9,vApyrjxnDH|zp,8p,ruuqxtCtwxtBsx|10k,5k,kAwnssoErvtyIDyrCxxyqxqEAyHJwztwAzwEsvqOlEoytutxlzuAtvuqmu|110,7t,uIqmzmxxvy||ns,4q,pwwCGGyvvxHCuxpstyyxvyrAuvwqspdjrnptpy|ny,5t,yuuEjqwsEv|n8,5f,xtyzuCswskxw|n5,3f,tmEruzxxrAwx|nj,3a,wxtzqqBu|lf,3e,Cytz|lw,3n,wsssqtvrtytnzmDvrBDuqDzwFJAwsAxxryhvmztuFpputtAtttvrBw|kt,1x,uyzyqzhzhsztntCtnuysBuAyAtAwGt|rs,5a,EDsvtF|re,5d,Bwur|qz,5b,uqoq|117,9i,trAxvAss|11h,9w,wqxvvzyqvArBtq|11z,a4,wCuztqtyvBqsvprspAuuxqAswxzryvvrzywz|10z,a0,pAEfxzqC|11a,8p,xBuztxwEGxwCpquwsspvwrtuvxsqvfDw|11e,9p,usAxwxqzvq|11t,9l,xBrtxAtwsoxwvtsrBx|yz,ag,BCvGzBvwswlnob|zx,b2,CwwqCtAo|10h,ap,xxyuwp|10n,ak,CnyAByqC|10h,ap,Bq||p3,2p,cyprtmwsImpr|o3,4b,Dq|qy,8q,AGMM||rh,9j,klpvssuzpu|12n,5n,uBzHvzjxrBqpfzBzvEtxstvqoqzuBlHvwlzyAorfzuDG|12l,4z,xtzAqxuAmrwBrvrqvrAvrkKD|11w,6h,zrAyuyruvyrr|ss,8x,sxuzgDbDsuusslvp|ri,8z,xpKwxxDmIt|s1,77,EFzF||ri,8z,mfmlsjqrjctvwo|||||||||q3,69,Csty|q8,69,qv|q8,69,ryssxv|k5,88,H6DmzuFmuoxoGnzmLy|pa,85,s0ukxn|p8,6r,LzErzzwtEv|qf,72,rFnkMZvABA|nl,6j,LAxzKBzrurzqEwFA|qn,aj,pnqszq|rh,9j,tDzv|rj,9r,uxBCNB|rk,9i,wztwxw||rl,9o,zBRq||q3,au,Gtyt|od,4u,yzty||||op,58,vsrsty||||","hl":{"124":[[[15,16,17,18]],[[19]],[[20]],[[22]],[[23]],[[24]],[[25]],[[26]],[[27]],[[28]],[[29]],[[30]],[[31]],[[32]],[[33]],[[34]],[[35]],[[36]],[[37]],[[38]],[[39]],[[40]],[[41]],[[42]],[[43]],[[44]],[[45]],[[46]],[[47]]],"156":[[[521]],[[-61,-150,-393,-148,-391,522,-385,-379,-384,-401,-403,-399,-404,-397,-408,-410,-414,-415]]],"250":[[[237,238,239,240,241,242,243,244]],[[245]]],"276":[[[-446,469,-453,470,-238,471,472,473,474,475,476]]],"360":[[[-72,75]],[[76,77]],[[78]],[[79,80]],[[81]],[[82]],[[83]],[[84]],[[85]],[[86]],[[87]],[[88]],[[89]]],"414":[[[354,355,356]]],"458":[[[-374,543]],[[-81,544,545,546]]],"566":[[[-278,-280,283,284]]],"752":[[[-172,429,430]]],"784":[[[347,348,349,350,351]]],"840":[[[-19,48,49,50]],[[51]],[[56]],[[57]],[[-17,58]],[[59]]],"036":[[[518]],[[519]]]},"proj":{"W":1600,"H":697,"k":296.02080835702793,"xmin":-2.7025127201028636,"ymax":1.3787383326297975}};
  var P = DATA.proj, W = P.W, H = P.H, D = Math.PI / 180, NS = 'http://www.w3.org/2000/svg';
  var ALPH = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', LIM = 31;

  // Natural Earth projection (Savric et al.), same constants used to build the data
  function NE(lon, lat) {
    var l = lon * D, p = lat * D, p2 = p * p, p4 = p2 * p2;
    return [l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))),
            p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))];
  }
  function XY(lat, lon) { var q = NE(lon, lat); return [(q[0] - P.xmin) * P.k, (P.ymax - q[1]) * P.k]; }
  function r1(v) { return Math.round(v * 10) / 10; }

  function decodePiece(s) {
    var f = s.split(','), x = parseInt(f[0], 36), y = parseInt(f[1], 36), d = f[2] || '', pts = [[x, y]], i;
    for (i = 0; i < d.length; i += 2) { x += ALPH.indexOf(d.charAt(i)) - LIM; y += ALPH.indexOf(d.charAt(i + 1)) - LIM; pts.push([x, y]); }
    return pts;
  }
  // an arc is a list of pieces (more than one only where it was cut at the date line)
  function decode(s) { return s ? s.split('~').map(decodePiece) : null; }
  var ARCS = DATA.arcs.split('|').map(decode);
  function lineD(pts) {
    var d = 'M' + pts[0][0] + ' ' + pts[0][1] + 'l', i;
    for (i = 1; i < pts.length; i++) d += (pts[i][0] - pts[i - 1][0]) + ' ' + (pts[i][1] - pts[i - 1][1]) + ' ';
    return d;
  }
  function ringPts(ring) {
    var out = [];
    ring.forEach(function (ix, j) {
      var rev = ix < 0, pieces = ARCS[rev ? ~ix : ix]; if (!pieces) return;
      var a = pieces.length === 1 ? pieces[0] : [].concat.apply([], pieces);
      var p = rev ? a.slice().reverse() : a;
      out = out.concat(j === 0 ? p : p.slice(1));
    });
    return out;
  }
  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name), k;
    for (k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // Places. `hl` is the Natural Earth country id used for the hatching.
  var LOC = [
    { c: 'china', n: 'China', hl: '156', cities: [['Shanghai', 31.23, 121.47], ['Ningbo', 29.87, 121.55], ['Hangzhou', 30.27, 120.16], ['Beijing', 39.90, 116.41], ['Nanjing', 32.06, 118.80], ['Chengdu', 30.57, 104.07]] },
    { c: 'united-states', n: 'United States', hl: '840', cities: [['Houston', 29.76, -95.37], ['San Francisco', 37.77, -122.42], ['Denver', 39.74, -104.99]] },
    { c: 'indonesia', n: 'Indonesia', hl: '360', cities: [['Jakarta', -6.21, 106.85], ['Pekanbaru', 0.51, 101.45]] },
    { c: 'united-arab-emirates', n: 'United Arab Emirates', hl: '784', cities: [['Dubai', 25.20, 55.27], ['Sharjah', 25.35, 55.42]] },
    { c: 'france', n: 'France', hl: '250', cities: [['La Tour-du-Pin', 45.56, 5.44]] },
    { c: 'nigeria', n: 'Nigeria', hl: '566', cities: [['Port Harcourt', 4.82, 7.05]] },
    { c: 'malaysia', n: 'Malaysia', hl: '458', cities: [['Kuala Lumpur', 3.14, 101.69]] },
    { c: 'canada', n: 'Canada', hl: '124', cities: [['Vancouver', 49.28, -123.12]] },
    { c: 'germany', n: 'Germany', hl: '276', cities: [['Erlangen', 49.60, 11.00]] },
    { c: 'sweden', n: 'Sweden', hl: '752', cities: [['Stockholm', 59.33, 18.07]] },
    { c: 'kuwait', n: 'Kuwait', hl: '414', cities: [['Kuwait City', 29.38, 47.99]] },
    { c: 'australia', n: 'Australia', hl: '036', cities: [] }
  ];
  var HOME = ['Adelaide', -34.93, 138.60];

  var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'presentation', focusable: 'false' });
  var defs = el('defs', {}, svg);
  function hatch(id, gap, alpha) {
    var p = el('pattern', { id: id, patternUnits: 'userSpaceOnUse', width: gap, height: gap, patternTransform: 'rotate(45)' }, defs);
    el('line', { x1: 0, y1: 0, x2: 0, y2: gap, stroke: '#17191f', 'stroke-opacity': alpha, 'stroke-width': 1 }, p);
    return p;
  }
  var pat1 = hatch('wm-hatch', 6, 0.62), pat2 = hatch('wm-hatch2', 3.4, 0.85);

  // graticule and frame
  var LAT0 = -56, LAT1 = 83.6, gd = '', lon, lat, i, pt;
  for (lon = -150; lon <= 150; lon += 30) {
    for (lat = LAT0; lat <= LAT1; lat += 4) { pt = XY(lat, lon); gd += (lat === LAT0 ? 'M' : 'L') + r1(pt[0]) + ' ' + r1(pt[1]); }
  }
  [-30, 0, 30, 60].forEach(function (la) {
    for (lon = -180; lon <= 180; lon += 6) { pt = XY(la, lon); gd += (lon === -180 ? 'M' : 'L') + r1(pt[0]) + ' ' + r1(pt[1]); }
  });
  el('path', { class: 'grat', d: gd }, svg);
  var fd = '';
  for (lat = LAT1; lat >= LAT0; lat -= 2) { pt = XY(lat, -180); fd += (lat === LAT1 ? 'M' : 'L') + r1(pt[0]) + ' ' + r1(pt[1]); }
  for (lon = -180; lon <= 180; lon += 6) { pt = XY(LAT0, lon); fd += 'L' + r1(pt[0]) + ' ' + r1(pt[1]); }
  for (lat = LAT0; lat <= LAT1; lat += 2) { pt = XY(lat, 180); fd += 'L' + r1(pt[0]) + ' ' + r1(pt[1]); }
  for (lon = 180; lon >= -180; lon -= 6) { pt = XY(LAT1, lon); fd += 'L' + r1(pt[0]) + ' ' + r1(pt[1]); }
  el('path', { class: 'frame', d: fd + 'Z' }, svg);

  // latitude labels down the left edge
  var latLabels = [];
  [[60, '60°N'], [30, '30°N'], [0, '0°'], [-30, '30°S']].forEach(function (t) {
    pt = XY(t[0], -180); latLabels.push(el('text', { class: 'tick', x: pt[0] + 4, y: pt[1] - 3 }, svg)); latLabels[latLabels.length - 1].textContent = t[1];
  });

  // hatched countries, then all coastlines and borders on top
  var hlc = {}, hlByC = {};
  LOC.forEach(function (L) {
    var polys = DATA.hl[L.hl]; if (!polys || !polys.length) return;
    var d = ''; polys.forEach(function (poly) { poly.forEach(function (ring) { var p = ringPts(ring); if (p.length > 2) d += lineD(p) + 'Z'; }); });
    hlc[L.c] = el('path', { class: 'hlc', d: d, 'fill-rule': 'evenodd', 'data-c': L.c }, svg);
  });
  var ld = ''; ARCS.forEach(function (a) { if (a) a.forEach(function (piece) { ld += lineD(piece); }); });
  el('path', { class: 'land', d: ld }, svg);

  // markers
  var layer = el('g', { class: 'marks' }, svg), groups = {}, dots = [], halos = [], rings = [], hits = [], labels = [], homeBits = [];
  LOC.forEach(function (L) {
    var g = el('g', { class: 'loc', 'data-c': L.c }, layer); groups[L.c] = g;
    var pts = L.cities.map(function (c) { return XY(c[1], c[2]); });
    if (L.c === 'australia') {   // home base: a small diamond, labelled
      var h = XY(HOME[1], HOME[2]), dia = el('path', { class: 'home-mark', 'data-x': r1(h[0]), 'data-y': r1(h[1]) }, g);
      var t = el('text', { class: 'lbl home-lbl', 'data-x': r1(h[0]), 'data-y': r1(h[1]) }, g); t.textContent = 'Adelaide';
      homeBits.push(dia, t); hits.push(el('circle', { class: 'hit', cx: r1(h[0]), cy: r1(h[1]) }, g));
      var ac = XY(-24, 134), tt = el('text', { class: 'lbl', 'data-x': r1(ac[0]), 'data-y': r1(ac[1]) }, g); tt.textContent = 'Australia'; labels.push(tt);
      return;
    }
    var cx = 0, miny = 1e9, minx = 1e9; pts.forEach(function (p) { cx += p[0]; if (p[1] < miny) miny = p[1]; });
    cx /= pts.length;
    pts.forEach(function (p) {
      rings.push(el('circle', { class: 'ring', cx: r1(p[0]), cy: r1(p[1]) }, g));
      halos.push(el('circle', { class: 'halo', cx: r1(p[0]), cy: r1(p[1]) }, g));
      dots.push(el('circle', { class: 'dot', cx: r1(p[0]), cy: r1(p[1]) }, g));
      hits.push(el('circle', { class: 'hit', cx: r1(p[0]), cy: r1(p[1]) }, g));
    });
    var lbl = el('text', { class: 'lbl', 'data-x': r1(cx), 'data-y': r1(miny) }, g); lbl.textContent = L.n; labels.push(lbl);
  });
  host.appendChild(svg);

  // sizes in screen pixels, converted to map units so the markers stay crisp at any width
  function layout() {
    var w = host.clientWidth || W, u = W / w, i, e;
    pat1.setAttribute('width', 6 * u); pat1.setAttribute('height', 6 * u); pat1.firstChild.setAttribute('y2', 6 * u); pat1.firstChild.setAttribute('stroke-width', 0.9 * u);
    pat2.setAttribute('width', 3.4 * u); pat2.setAttribute('height', 3.4 * u); pat2.firstChild.setAttribute('y2', 3.4 * u); pat2.firstChild.setAttribute('stroke-width', 0.9 * u);
    var s = w < 520 ? 0.7 : 1;   // lighter markers on small screens
    dots.forEach(function (e) { e.setAttribute('r', 2.8 * s * u); });
    halos.forEach(function (e) { e.setAttribute('r', 4.4 * s * u); });
    rings.forEach(function (e) { e.setAttribute('r', 8 * s * u); });
    hits.forEach(function (e) { e.setAttribute('r', 14 * u); });
    var fs = (w < 520 ? 10 : 12.5) * u;
    labels.concat(homeBits.filter(function (b) { return b.tagName.toLowerCase() === 'text'; })).forEach(function (t) {
      var x = parseFloat(t.getAttribute('data-x')), y = parseFloat(t.getAttribute('data-y')), off = t.getAttribute('data-off');
      var anchor = x < 90 * u ? 'start' : (x > W - 90 * u ? 'end' : 'middle');
      t.setAttribute('font-size', fs); t.setAttribute('text-anchor', anchor); t.setAttribute('x', x);
      t.setAttribute('y', off ? y + 22 * u : (t.classList.contains('home-lbl') ? y + 18 * u : y - 11 * u));
      t.style.strokeWidth = 3.4 * u;
    });
    homeBits.forEach(function (b) {
      if (b.tagName.toLowerCase() !== 'path') return;
      var x = parseFloat(b.getAttribute('data-x')), y = parseFloat(b.getAttribute('data-y')), s = 5.4 * u;
      b.setAttribute('d', 'M' + x + ' ' + (y - s) + 'L' + (x + s) + ' ' + y + 'L' + x + ' ' + (y + s) + 'L' + (x - s) + ' ' + y + 'Z');
    });
    latLabels.forEach(function (t) { t.setAttribute('font-size', 10.5 * u); });
  }
  if (window.ResizeObserver) new ResizeObserver(layout).observe(host); else window.addEventListener('resize', layout);
  layout();

  // map and list highlight each other
  var chips = {}, current = null;
  Array.prototype.forEach.call(document.querySelectorAll('.place-grid [data-c], .place-note[data-c]'), function (e) { chips[e.getAttribute('data-c')] = e; });
  function setOn(c, on) {
    [groups[c], hlc[c], chips[c]].forEach(function (e) { if (e) e.classList.toggle('on', on); });
  }
  function focusOn(c) { if (current && current !== c) setOn(current, false); current = c; if (c) setOn(c, true); }
  Object.keys(groups).forEach(function (c) {
    var g = groups[c];
    g.addEventListener('mouseenter', function () { focusOn(c); });
    g.addEventListener('mouseleave', function () { focusOn(null); });
    g.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') focusOn(current === c ? null : c); });
  });
  Object.keys(chips).forEach(function (c) {
    var e = chips[c];
    e.addEventListener('mouseenter', function () { focusOn(c); });
    e.addEventListener('mouseleave', function () { focusOn(null); });
    e.addEventListener('click', function () { focusOn(current === c ? null : c); });
  });
  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch' && !e.target.closest('.wmap, .place-grid, .place-note')) focusOn(null);
  });
  host.removeAttribute('hidden');
})();
