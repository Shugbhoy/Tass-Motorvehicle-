import { useState, useRef, useEffect } from "react";

const NAVY  = "#0D1B3E";
const TEAL  = "#1A9E8F";
const AMBER = "#F4A623";
const RUST  = "#C0392B";
const GREEN = "#1A6B3A";
const RED   = "#DC2626";
const GREY  = "#F0F4F8";
const WHITE = "#FFFFFF";
const MID   = "#64748B";

function TASSLogo({ size = "md", theme = "light" }) {
  const s = { sm:{the:9,main:18,sub:16,tag:9,rW:16,rH:1.5,gap:2}, md:{the:11,main:24,sub:22,tag:11,rW:22,rH:2,gap:3}, lg:{the:14,main:32,sub:29,tag:13,rW:28,rH:2,gap:4} }[size]||{the:11,main:24,sub:22,tag:11,rW:22,rH:2,gap:3};
  const navy=theme==="dark"?"#fff":NAVY, tag=theme==="dark"?"rgba(255,255,255,0.5)":"#6B7FA3", tagB=theme==="dark"?"rgba(255,255,255,0.75)":"#3D4F6B";
  return (
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:s.gap,userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <div style={{width:s.rW,height:s.rH,background:TEAL,borderRadius:99}}/><span style={{color:TEAL,fontSize:s.the,fontWeight:800,letterSpacing:"0.25em",textTransform:"uppercase",lineHeight:1}}>THE</span><div style={{width:s.rW,height:s.rH,background:TEAL,borderRadius:99}}/>
      </div>
      <div style={{color:navy,fontSize:s.main,fontWeight:900,letterSpacing:"-0.01em",textTransform:"uppercase",lineHeight:1,marginTop:-1}}>APPRENTICESHIP</div>
      <div style={{color:TEAL,fontSize:s.sub,fontWeight:900,letterSpacing:"-0.01em",textTransform:"uppercase",lineHeight:1,marginTop:-3}}>SUCCESS SYSTEM™</div>
      <div style={{width:"70%",height:s.rH,background:TEAL,borderRadius:99}}/>
      <div style={{color:tag,fontSize:s.tag,letterSpacing:"0.16em",textTransform:"uppercase",fontWeight:400,marginTop:1}}>Stop Guessing.{" "}<strong style={{fontWeight:800,color:tagB}}>Start Securing.</strong></div>
    </div>
  );
}

const TABS = [
  {id:"home",      icon:"🏠", label:"Home"},
  {id:"sector",    icon:"🚗", label:"Sector"},
  {id:"pathways",  icon:"📋", label:"Pathways"},
  {id:"technical", icon:"🔧", label:"Technical"},
  {id:"ev",        icon:"⚡", label:"EV & Hybrid"},
  {id:"employers", icon:"🏭", label:"Employers"},
  {id:"cycles",    icon:"📅", label:"Cycles"},
  {id:"mjs",       icon:"🏛️",  label:"MyJobScot"},
  {id:"cv",        icon:"📄", label:"CV"},
  {id:"star",      icon:"⭐", label:"STAR"},
  {id:"interview", icon:"🎤", label:"Interview"},
  {id:"ready",     icon:"✅", label:"Am I Ready"},
  {id:"coach",     icon:"🤖", label:"AI Coach"},
];

function PageHeader({icon,title,subtitle}){
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:22}}>{icon}</span>
        <h2 style={{color:NAVY,fontSize:20,fontWeight:900,margin:0,letterSpacing:"-0.02em"}}>{title}</h2>
      </div>
      <div style={{height:3,width:40,background:AMBER,borderRadius:2,marginBottom:8}}/>
      {subtitle&&<p style={{color:MID,fontSize:13,lineHeight:1.6,margin:0}}>{subtitle}</p>}
    </div>
  );
}

function Card({children,style={}}){
  return <div style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.04)",...style}}>{children}</div>;
}

function InfoBox({text,type="tip"}){
  const s={tip:{bg:"#FFFBEB",border:AMBER,col:"#92400E"},info:{bg:"#EFF6FF",border:TEAL,col:"#1A5276"},success:{bg:"#F0FDF4",border:GREEN,col:"#14532D"},warning:{bg:"#FEF2F2",border:RUST,col:"#7F1D1D"},red:{bg:"#FEF2F2",border:RED,col:"#991B1B"}}[type]||{bg:"#FFFBEB",border:AMBER,col:"#92400E"};
  return <div style={{background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:8,padding:"10px 13px",marginBottom:14}}><p style={{color:s.col,fontSize:13,lineHeight:1.65,margin:0}}>{text}</p></div>;
}

function Accordion({items,accent=TEAL}){
  const [open,setOpen]=useState(null);
  return (
    <div>{items.map((item,i)=>(
      <div key={i} style={{background:WHITE,border:`1px solid ${open===i?accent:"#E2E8F0"}`,borderRadius:10,overflow:"hidden",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
        <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:"inherit"}}>
          <span style={{color:NAVY,fontWeight:700,fontSize:14,textAlign:"left"}}>{item.title}</span>
          <span style={{color:accent,fontSize:18,flexShrink:0}}>{open===i?"−":"+"}</span>
        </button>
        {open===i&&<div style={{padding:"0 15px 15px",borderTop:"1px solid #F0F4F8"}}><div style={{paddingTop:12}}>{typeof item.content==="string"?<p style={{color:"#444",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{item.content}</p>:item.content}</div></div>}
      </div>
    ))}</div>
  );
}

function ExampleToggle({weak,strong,weakLabel="✗ Weak",strongLabel="✓ Strong"}){
  const [show,setShow]=useState(null);
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <button onClick={()=>setShow(show==="weak"?null:"weak")} style={{flex:1,padding:"9px 8px",background:show==="weak"?RUST:WHITE,border:`2px solid ${RUST}`,color:show==="weak"?WHITE:RUST,borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>{show==="weak"?"Hide":weakLabel}</button>
        <button onClick={()=>setShow(show==="strong"?null:"strong")} style={{flex:1,padding:"9px 8px",background:show==="strong"?GREEN:WHITE,border:`2px solid ${GREEN}`,color:show==="strong"?WHITE:GREEN,borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>{show==="strong"?"Hide":strongLabel}</button>
      </div>
      {show==="weak"&&<div style={{background:"#FEF2F2",borderLeft:`3px solid ${RUST}`,borderRadius:8,padding:"12px 14px",marginBottom:8}}><p style={{color:RUST,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 6px"}}>Weak — vague, no evidence</p><p style={{color:"#7F1D1D",fontSize:13,lineHeight:1.7,margin:0,fontStyle:"italic",whiteSpace:"pre-line"}}>{weak}</p></div>}
      {show==="strong"&&<div style={{background:"#F0FDF4",borderLeft:`3px solid ${GREEN}`,borderRadius:8,padding:"12px 14px",marginBottom:8}}><p style={{color:GREEN,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 6px"}}>Strong — specific, evidenced</p><p style={{color:"#14532D",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{strong}</p></div>}
    </div>
  );
}

function NavTabBar({options,active,onSelect}){
  return (
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
      {options.map((opt,i)=>{
        const id=typeof opt==="object"?opt.id:opt, label=typeof opt==="object"?opt.label:opt, isActive=active===id;
        return <button key={i} onClick={()=>onSelect(id)} style={{background:isActive?NAVY:WHITE,color:isActive?WHITE:MID,border:`1px solid ${isActive?NAVY:"#E2E8F0"}`,borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:isActive?800:400,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.3,whiteSpace:"nowrap"}}>{label}</button>;
      })}
    </div>
  );
}

function HomeModule({setTab}){
  const cards=[
    {id:"sector",    icon:"🚗",title:"Sector Overview",        desc:"Scotland's automotive landscape — who is hiring and why now is an exceptional time to enter"},
    {id:"pathways",  icon:"📋",title:"All Pathways",           desc:"Light vehicle, heavy vehicle, body repair, paint, MET, parts, fast-fit, motorcycle and more"},
    {id:"technical", icon:"🔧",title:"Technical Knowledge",    desc:"MOT, OBD diagnostics, workshop safety, COSHH, tyre law — what you must know before interview"},
    {id:"ev",        icon:"⚡",title:"EV and Hybrid",          desc:"The biggest career differentiator in motor vehicle right now — high voltage safety and EV systems"},
    {id:"employers", icon:"🏭",title:"Scottish Employers",     desc:"Arnold Clark, Kwik Fit, Macklin Motors, John Clark, Lookers and more — who they are and how to apply"},
    {id:"cycles",    icon:"📅",title:"Recruitment Cycles",     desc:"When Scottish automotive employers hire — manufacturer academies, August and January intakes"},
    {id:"mjs",       icon:"🏛️", title:"MyJobScotland",         desc:"Council fleet, NHS fleet, Police Scotland, Scottish Ambulance Service — public sector automotive"},
    {id:"cv",        icon:"📄",title:"CV Builder",             desc:"Three complete profiles with weak and strong examples — school leaver, college, career changer"},
    {id:"star",      icon:"⭐",title:"STAR Examples",          desc:"Four motor vehicle-specific worked examples — diagnostics, customer service, safety, EV learning"},
    {id:"interview", icon:"🎤",title:"Interview Prep",         desc:"Technical and competency questions specific to automotive apprenticeship interviews"},
    {id:"ready",     icon:"✅",title:"Am I Ready?",            desc:"An honest self-assessment — motor vehicle is physically demanding and technically rigorous"},
    {id:"coach",     icon:"🤖",title:"AI Coach",               desc:"Mock interviews, CV feedback, technical knowledge checks and employer research"},
  ];
  return (
    <div>
      <div style={{background:`linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`,borderRadius:14,padding:"32px 20px 28px",display:"flex",justifyContent:"center",marginBottom:20}}>
        <TASSLogo size="lg" theme="dark"/>
      </div>
      <Card style={{borderLeft:`4px solid ${RED}`,background:"#FEF2F2"}}>
        <p style={{color:"#991B1B",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 4px"}}>Motor Vehicle</p>
        <p style={{color:NAVY,fontSize:14,lineHeight:1.7,margin:0}}>Scotland's dedicated preparation module for Motor Vehicle Modern Apprenticeships at SCQF Levels 5, 6 and 7. Covers all nine pathways, Scottish employers, EV and hybrid technology, workshop safety, MyJobScotland guidance and sector-specific STAR examples — with a live AI coach throughout.</p>
      </Card>
      <Card style={{borderLeft:`4px solid ${TEAL}`,background:"#EFF6FF",marginBottom:20}}>
        <p style={{color:"#1A5276",fontWeight:700,fontSize:13,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:0.5}}>Start here</p>
        <p style={{color:"#1A5276",fontSize:13,lineHeight:1.65,margin:0}}>Read <strong>Sector Overview</strong> first. Then <strong>EV and Hybrid</strong> — this is the biggest differentiator in motor vehicle right now and most candidates know nothing about it. Do <strong>Technical Knowledge</strong> before any interview.</p>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        {cards.map((c,i)=>(
          <button key={i} onClick={()=>setTab(c.id)} style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:12,padding:"14px 12px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=AMBER} onMouseLeave={e=>e.currentTarget.style.borderColor="#E2E8F0"}>
            <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
            <p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"0 0 3px",lineHeight:1.3}}>{c.title}</p>
            <p style={{color:MID,fontSize:11,lineHeight:1.4,margin:0}}>{c.desc}</p>
          </button>
        ))}
      </div>
      <div style={{textAlign:"center",color:"#AAA",fontSize:11}}><strong style={{color:TEAL}}>The Apprenticeship Success System™</strong> · tass.scot</div>
    </div>
  );
}

function SectorModule(){
  return (
    <div>
      <PageHeader icon="🚗" title="Sector Overview" subtitle="Scotland's automotive sector — what it is, who is hiring and why EV is changing everything."/>
      <Card style={{borderLeft:`4px solid ${RED}`,background:"#FEF2F2"}}>
        <p style={{color:"#991B1B",fontWeight:800,fontSize:14,margin:"0 0 6px"}}>Scotland has over 2,500 automotive businesses employing 25,000+ people</p>
        <p style={{color:"#991B1B",fontSize:13,lineHeight:1.7,margin:0}}>The motor vehicle sector is one of Scotland's most geographically spread industries — from main dealerships in Edinburgh and Glasgow to local garages across every town in Scotland. Every vehicle on Scotland's roads needs maintained, serviced and repaired. The shift to electric vehicles is creating an urgent skills shortage that makes qualified motor vehicle technicians exceptionally sought after right now.</p>
      </Card>
      <Accordion accent={RED} items={[
        {title:"What Scottish motor vehicle actually looks like",content:"The automotive sector in Scotland spans a much wider range than most people realise:\n\nMain dealerships — representing manufacturer brands (Ford, Vauxhall, BMW, Mercedes-Benz, Toyota, Volkswagen, Audi, Kia, Hyundai). Major Scottish dealer groups include Arnold Clark (Scotland's largest private company, 200+ sites), Macklin Motors, John Clark Motor Group and Lookers. These offer the most structured apprenticeship programmes with manufacturer-specific training.\n\nIndependent garages — local businesses providing repair and maintenance across all makes and models. Often more varied work exposure than a main dealer. Many excellent independent garages throughout Scotland.\n\nFast-fit centres — Kwik Fit (founded in Edinburgh, Scottish company), ATS Euromaster, Halfords Autocentre. High volume, fast pace, excellent for developing speed and customer-facing skills.\n\nBody shops — accident repair centres, either manufacturer-approved or independent. Nationwide chains (Solus, Copart) as well as independent body shops throughout Scotland.\n\nFleet and commercial vehicle — NHS Scotland fleet, all 32 Scottish council fleets, Police Scotland fleet, Scottish Ambulance Service, bus and coach operators (FirstGroup, Stagecoach both have significant Scottish operations), haulage companies. These roles are on MyJobScotland.\n\nSpecialist — classic car restoration, performance tuning, agricultural and plant machinery (land-based engineering), motorcycle specialists."},
        {title:"Why now is an exceptional time to enter motor vehicle",content:"Three factors make this an unusually strong time to enter motor vehicle:\n\n1. The EV skills crisis — Scotland has committed to phasing out new petrol and diesel car sales by 2030. The number of EVs on Scottish roads is growing rapidly. The number of technicians qualified to work on high-voltage systems is critically low. This skills gap is not a future problem — it is happening right now. Employers are actively competing for candidates with EV awareness.\n\n2. Scotland's road network — Scotland has proportionally more road per person than almost any part of the UK. Remote communities depend on vehicle reliability in a way that urban England does not. Motor vehicle technicians are needed in every part of Scotland.\n\n3. Skilled technician shortage — the automotive sector has a structural shortage of qualified technicians that has been building for over a decade. Qualified apprentices completing their MA are entering one of the strongest labour markets for any skilled trade in Scotland."},
        {title:"Career progression — from apprentice to master technician",content:"The career ladder in motor vehicle is clearly defined:\n\nAPPRENTICE TECHNICIAN (SCQF Level 5)\nLearning the fundamentals: routine servicing, basic diagnostics, safety inspections.\n\nTECHNICIAN (SCQF Level 6)\nQualified to perform the full range of maintenance and repair. Increasing diagnostic complexity.\n\nSENIOR TECHNICIAN / DIAGNOSTIC TECHNICIAN (SCQF Level 7)\nAdvanced diagnostics, complex electrical systems, EV and hybrid specialist work.\n\nMASTER TECHNICIAN / WORKSHOP FOREMAN\nManufacturer master technician accreditation. Supervising and mentoring junior technicians.\n\nWORKSHOP MANAGER / SERVICE MANAGER\nManaging the operation — staff, scheduling, quality, customer relationships.\n\nSalary benchmarks (Scotland):\n• Apprentice: £14,000–£18,000\n• Qualified Technician (Level 6): £24,000–£32,000\n• Senior/Diagnostic Technician: £32,000–£42,000\n• Master Technician: £40,000–£55,000\n• Workshop/Service Manager: £45,000–£65,000+\n\nArnold Clark technicians with EV certification are currently among the best-paid technicians in Scotland."},
        {title:"Electric vehicles — the career differentiator",content:"Every motor vehicle apprentice starting now will spend the majority of their career working on electric and hybrid vehicles. Scotland's EV transition is accelerating:\n\nScotland EV facts:\n• Scotland has the highest proportion of EV registrations in the UK outside London\n• The Scottish Government has committed to ending new petrol and diesel car sales by 2030\n• Scotland has the UK's most ambitious EV charging infrastructure programme\n• The number of EVs requiring serviced and repaired doubles every 18–24 months\n\nFor apprentices:\n• EV awareness and willingness to train in high-voltage safety is the single most important differentiator at interview right now\n• Employers are actively looking for candidates who have researched EVs, not ones who have never thought about them\n• The IMI (Institute of the Motor Industry) EV awareness and high-voltage qualifications are increasingly expected\n• Manufacturers (BMW, Tesla, Toyota, Volkswagen) provide EV-specific training through their approved dealer networks\n\nSee the EV and Hybrid tab for full technical coverage."},
      ]}/>
    </div>
  );
}

function PathwaysModule(){
  const pathways=[
    {id:"light",icon:"🚗",name:"Light Vehicle Maintenance and Repair",
     desc:"The most common automotive pathway. Working on cars and light vans — routine servicing, MOT preparation, brake and suspension work, engine diagnostics, electrical systems and increasingly EV and hybrid maintenance.",
     roles:"Apprentice Technician, Service Technician, Diagnostic Technician, MOT Tester (after 2 years qualified)",
     quals:"SVQ Automotive Level 5 and 6, IMI Awards Level 2 and 3 Light Vehicle",
     entry:"No formal academic requirements. National 5 Maths and a science subject (Physics, Engineering Science) are preferred by main dealerships. Mechanical aptitude and genuine enthusiasm essential.",
     day:["8:00 — Morning briefing: job allocation from the service advisor. Check the day's work cards.","8:30 — First job: 20,000-mile service on a Ford Focus. Oil and filter, air filter, pollen filter, brake fluid, tyre check, safety inspection.","10:30 — Diagnostic job: customer reports intermittent warning light. Connect OBD scanner, read fault codes, research cause, plan repair.","13:00 — Brake pad and disc replacement: front axle. Measure disc thickness, check caliper operation, torque wheel bolts to specification.","15:30 — Assisting senior tech on a gearbox oil change — observing complex procedure and documenting in learning portfolio.","16:30 — Update job cards, clean work bay, prepare for next day."]},
    {id:"heavy",icon:"🚛",name:"Heavy Goods and PSV Maintenance",
     desc:"Specialising in trucks, HGVs, buses and coaches. Larger, more complex systems — hydraulics, pneumatics, air brakes, tachographs. Often better paid than light vehicle. Stagecoach, FirstGroup and haulage companies are major employers.",
     roles:"Heavy Vehicle Technician, HGV Technician, Bus and Coach Technician",
     quals:"SVQ Automotive (Heavy Vehicle) Level 5 and 6, City and Guilds Heavy Vehicle",
     entry:"No formal academic requirements. Physical strength more important than light vehicle — these vehicles are large. Minimum age often 18 due to safety requirements.",
     day:["7:00 — Shift start: heavy vehicle operators often start earlier than light vehicle.","7:30 — Brake efficiency test on an HGV: roller brake test, check air brake system, inspect wheel and tyre condition.","9:30 — Air suspension fault: diagnose air leak in suspension bellows using leak detection equipment.","13:00 — Scheduled major service on a double-decker bus: 40,000-mile service including engine checks, hydraulic brake fluid, safety systems inspection.","16:00 — Tachograph check: verify digital tachograph calibration is in date — legal requirement for all HGV operators."]},
    {id:"body",icon:"🔨",name:"Vehicle Body Repair",
     desc:"Repairing structural damage to vehicle bodies — panel beating, welding, chassis alignment, composite repair. Requires meticulous attention to detail and genuine craft skill. The end result — a damaged car restored — is deeply satisfying.",
     roles:"Apprentice Body Repairer, Body Repair Technician, Structural Repair Technician",
     quals:"SVQ Automotive (Vehicle Body Repair) Level 5 and 6, IMI Awards Body Repair",
     entry:"No formal academic requirements. Spatial awareness, patience and attention to detail are the key personal qualities.",
     day:["8:00 — Vehicle assessment: new accident repair vehicle. Assess damage, create repair estimate with estimating software.","9:00 — Panel removal: strip damaged panels from a rear-end collision repair.","10:30 — Structural work: align chassis on jig equipment to manufacturer's dimensional specifications.","13:30 — Welding: replace a rear quarter panel section using MIG welding.","15:30 — Panel finishing: metal finishing after welding to prepare for paint — grinding, filling, blocking.","16:30 — Handover to paint department."]},
    {id:"paint",icon:"🎨",name:"Vehicle Paintwork",
     desc:"Preparing and refinishing vehicle surfaces after body repair. Mixing, spraying and polishing to match original colour exactly. Requires an eye for colour, patience and technical precision with spray equipment.",
     roles:"Paint Technician, Refinishing Technician, Automotive Painter",
     quals:"SVQ Automotive (Vehicle Paintwork) Level 5 and 6, IMI Awards Paint",
     entry:"No formal academic requirements. Colour perception and manual dexterity are particularly important.",
     day:["8:00 — Receive vehicles from body shop. Review repair order and assess surfaces to be painted.","8:30 — Surface preparation: sanding, degreasing, masking — the most time-consuming stage.","10:00 — Colour matching: use spectrophotometer and mixing system to match original vehicle colour.","11:30 — Priming: apply primer to prepared surfaces, allow to cure.","13:30 — Topcoat application: spray basecoat colour in spray booth.","15:00 — Lacquer application: apply clearcoat for gloss and protection.","16:00 — Polishing: machine polish to final finish. Quality check before handback."]},
    {id:"met",icon:"🔌",name:"MET Technician",
     desc:"Mechanical, Electrical and Trim — the specialist who removes and refits all mechanical, electrical and trim components during accident repair. Increasingly important as modern vehicles have more integrated electrical systems.",
     roles:"MET Technician, Mechanical and Electrical Technician",
     quals:"SVQ Automotive (MET) Level 5 and 6",
     entry:"No formal academic requirements. Understanding of both mechanical and electrical systems is a strength.",
     day:["8:00 — Strip damaged vehicle: remove all components from accident-damaged area — panels, lighting, sensors, wiring harnesses, airbag systems.","10:30 — Airbag module handling: follow strict safety procedure for removing deployed airbag systems.","13:00 — Post-repair refit: refit all stripped components to repaired vehicle.","15:00 — Electrical testing: verify all electrical components function correctly after refit — lights, sensors, cameras, ADAS calibration.","16:30 — Road test: check all systems function in normal driving conditions."]},
    {id:"parts",icon:"📦",name:"Vehicle Parts Advisor",
     desc:"Managing and advising on vehicle parts — identifying correct components, ordering, stock management and advising technicians and customers. Requires strong product knowledge and customer communication skills.",
     roles:"Parts Advisor Assistant, Parts Advisor, Parts Manager",
     quals:"SVQ Automotive (Vehicle Parts) Level 5 and 6",
     entry:"No formal academic requirements. Strong organisational skills, attention to detail and communication ability are key.",
     day:["8:00 — Open parts department: check overnight orders, update stock system.","8:30 — Technician requests: supply parts from stock for the day's jobs.","10:00 — Customer counter: retail customers require parts for their own vehicles — identify correct parts, advise on fitment.","13:00 — Supplier orders: identify stock shortages, place orders with suppliers.","14:30 — Parts delivery arrival: check delivery against order, update stock levels, locate in warehouse.","16:00 — Returns processing: handle warranty returns and supplier credits."]},
    {id:"fastfit",icon:"🔄",name:"Vehicle Fitting (Fast-Fit)",
     desc:"High-volume, quick-turnaround services — tyre fitting, exhaust replacement, battery checks, wiper blades, brake pads. Fast-paced customer-facing environment. Kwik Fit (founded in Edinburgh) is Scotland's major employer in this pathway.",
     roles:"Vehicle Fitter, Tyre Technician, Specialist Tyre Fitter",
     quals:"SVQ Automotive (Vehicle Fitting) Level 5 and 6, BTMA Tyre Safety qualifications",
     entry:"No formal academic requirements. Speed, customer service ability and physical fitness are important.",
     day:["8:00 — Bay preparation: check equipment, tyres in stock, lifts operational.","8:30 — First customer: four-tyre replacement. Remove wheels, fit new tyres, balance, refit, torque to specification.","10:00 — Exhaust replacement: customer with blown exhaust. Diagnose which sections, quote, fit.","11:30 — Battery health check: 15-minute check of battery condition, charging system and alternator output.","13:30 — Brake inspection: customer advisory. Inspect pad thickness, disc condition, advise on urgency.","15:00 — MOT failure reinspection: recheck vehicle after failed MOT for tyre-related items."]},
    {id:"motorcycle",icon:"🏍️",name:"Motorcycle Maintenance and Repair",
     desc:"Specialist pathway for people passionate about motorcycles. Covers the full range of maintenance and repair on all types of motorcycle — from commuter scooters to performance superbikes. A smaller but passionate community of employers.",
     roles:"Motorcycle Technician, Apprentice Motorcycle Technician",
     quals:"SVQ Automotive (Motorcycle) Level 5 and 6",
     entry:"No formal academic requirements. Genuine passion for motorcycles is essential — employers in this pathway will know immediately if you ride or have hands-on bike experience.",
     day:["8:30 — Service booking review: today's jobs include a Honda annual service, a Kawasaki suspension setup and a Triumph electrical diagnosis.","9:00 — Annual service: engine oil, air filter, spark plugs, chain check and adjustment, brake fluid, safety inspection.","11:00 — Suspension setup: customer requires front forks reset for track day riding — adjust preload, compression and rebound.","14:00 — Electrical diagnosis: Triumph warning light. OBD scan, fault code research, identify faulty throttle position sensor.","16:00 — Tyre fitting: two-wheel tyre fitting requires different technique from four-wheel — balance is more critical."]},
  ];
  const [active,setActive]=useState("light");
  const p=pathways.find(x=>x.id===active)||pathways[0];
  return (
    <div>
      <PageHeader icon="📋" title="All Pathways" subtitle="Nine distinct motor vehicle MA frameworks — select yours to see roles, qualifications, entry requirements and a day in the life."/>
      <InfoBox text="No formal academic qualifications are required for motor vehicle MAs. Mechanical aptitude, genuine enthusiasm and willingness to learn matter far more than grades." type="info"/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
        {pathways.map(pw=>(
          <button key={pw.id} onClick={()=>setActive(pw.id)} style={{background:active===pw.id?NAVY:WHITE,color:active===pw.id?WHITE:MID,border:`1px solid ${active===pw.id?NAVY:"#E2E8F0"}`,borderRadius:20,padding:"6px 10px",fontSize:10,fontWeight:active===pw.id?800:400,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>
            {pw.icon} {pw.name.split(" ")[0]}
          </button>
        ))}
      </div>
      <Card>
        <p style={{color:RED,fontWeight:800,fontSize:15,margin:"0 0 4px"}}>{p.icon} {p.name}</p>
        <p style={{color:"#444",fontSize:13,lineHeight:1.65,margin:"0 0 12px"}}>{p.desc}</p>
        {[["Typical roles",p.roles],["Qualifications",p.quals],["Entry requirements",p.entry]].map(([label,val],i)=>(
          <div key={i} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:"1px solid #F0F4F8"}}>
            <span style={{color:MID,fontSize:11,fontWeight:700,textTransform:"uppercase",minWidth:110,flexShrink:0}}>{label}</span>
            <span style={{color:NAVY,fontSize:13,lineHeight:1.5}}>{val}</span>
          </div>
        ))}
        <p style={{color:TEAL,fontSize:11,fontWeight:700,textTransform:"uppercase",margin:"12px 0 8px"}}>Day in the life</p>
        {p.day.map((item,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:7,alignItems:"flex-start"}}>
            <div style={{width:5,height:5,background:RED,borderRadius:99,flexShrink:0,marginTop:5}}/>
            <p style={{color:"#444",fontSize:13,lineHeight:1.55,margin:0}}>{item}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}

function TechnicalModule(){
  const [cat,setCat]=useState("safety");
  const categories={
    safety:{label:"Workshop Safety",icon:"🦺",items:[
      {q:"What does COSHH stand for and why does it matter in a motor vehicle workshop?",a:"COSHH stands for Control of Substances Hazardous to Health (COSHH Regulations 2002). It requires employers to identify and control exposure to hazardous substances.\n\nIn a motor vehicle workshop, hazardous substances include:\n• Engine oil, brake fluid, coolant, transmission fluid — skin and eye irritants\n• Brake cleaner and degreasers — solvent vapours\n• Battery acid — highly corrosive\n• Refrigerant gases (air conditioning) — environmental and health hazards\n• Welding fumes — respiratory hazard\n• Paint and thinners — solvent vapours, fire risk\n• Asbestos (in older brake and clutch components) — carcinogenic\n\nBefore using any chemical in the workshop, a COSHH assessment must have been conducted. Data sheets (MSDS) must be available. Correct PPE must be used — gloves, eye protection, respiratory protection where required.",why:"COSHH knowledge is tested at virtually every motor vehicle interview. Being able to name specific hazardous substances in the workshop and the controls required shows genuine knowledge — not just awareness that chemicals can be dangerous."},
      {q:"What is LOLER and when does it apply in a motor vehicle workshop?",a:"LOLER stands for Lifting Operations and Lifting Equipment Regulations 1998. It requires that all lifting equipment is:\n• Sufficiently strong and stable for its intended use\n• Marked with its safe working load (SWL)\n• Positioned and installed to minimise risk\n• Used safely — with planned and supervised lifting operations\n• Thoroughly examined by a competent person at regular intervals (at least every 6 months for equipment used to lift people; every 12 months for other lifting equipment)\n\nIn a motor vehicle workshop, LOLER applies to:\n• Vehicle lifts (two-post, four-post, scissor lifts)\n• Floor jacks and axle stands\n• Engine hoists and cranes\n• Transmission jacks\n\nBefore using any lift, always check: the SWL is not exceeded, the lift is in good condition, the vehicle is positioned correctly on the lift points, and safety locks are engaged.",why:"LOLER is one of the most safety-critical regulations in a motor vehicle workshop. A vehicle falling from a lift can kill. Every technician must understand LOLER and follow safe lifting procedures — this is tested at interview by safety-conscious employers."},
      {q:"What is PUWER and how does it affect workshop tool use?",a:"PUWER stands for Provision and Use of Work Equipment Regulations 1998. It requires that all work equipment is:\n• Suitable for its intended use\n• Safe for use and maintained in a safe condition\n• Inspected to ensure it remains safe\n• Only used by people who have received adequate information, instruction and training\n• Accompanied by suitable safety measures (guards, emergency stops etc.)\n\nIn a motor vehicle workshop, PUWER applies to:\n• Power tools (drills, grinders, impact guns)\n• Workshop machinery (bench grinders, pillar drills, lathes)\n• Compressed air equipment\n• Diagnostic equipment\n\nKey requirement: before using any workshop tool, you must have been trained to use it safely. You must not use equipment you have not been trained on.",why:"PUWER alongside LOLER and COSHH form the three key workshop safety regulations. Knowing all three demonstrates genuine health and safety awareness — not just the generic 'safety is important' answer that most candidates give."},
      {q:"What PPE is required for different tasks in a motor vehicle workshop?",a:"PPE requirements vary by task:\n\nGeneral workshop work:\n• Safety footwear (steel toe cap) — always required\n• Overalls — protection from contamination\n• Nitrile gloves — when handling oils, brake fluid, chemicals\n\nGrinding and cutting:\n• Eye protection (face shield or safety glasses)\n• Hearing protection\n• Dust mask if grinding produces dust\n\nWelding:\n• Auto-darkening welding helmet\n• Welding gloves\n• Welding jacket or leather apron\n• Respiratory protection (welding fumes)\n\nAir conditioning work:\n• Refrigerant-specific PPE — eye protection\n\nEV and hybrid high-voltage work:\n• Insulated gloves rated for the voltage (minimum Category 0 — 1,000V)\n• Arc flash protection\n• Insulated tools\n• Face shield",why:"PPE selection is task-specific in a workshop — not just 'wear gloves and goggles'. Knowing which PPE applies to which task demonstrates that you have genuinely researched workshop practice."},
    ]},
    mot:{label:"MOT",icon:"📋",items:[
      {q:"What does the MOT test cover and what are the three outcomes?",a:"The MOT (Ministry of Transport) test is an annual roadworthiness inspection required for vehicles over 3 years old in the UK.\n\nWhat the MOT covers:\n• Brakes — efficiency, balance, handbrake operation\n• Steering and suspension — play, condition, geometry\n• Tyres — tread depth (minimum 1.6mm), condition, matching across axle\n• Lights — all lights operational, beam alignment\n• Windscreen and wipers — visibility, chip/crack assessment\n• Exhaust and emissions — noise level, emissions standards\n• Bodywork — structural integrity, sharp edges\n• Seat belts — condition and operation\n• Horn — operation\n• Mirrors — presence and condition\n• Fuel system — no leaks\n• Registration plates — presence and legibility\n\nThree outcomes:\n1. Pass — vehicle meets the standard\n2. Fail — vehicle has one or more failures. Cannot be driven away legally (unless going directly to repair)\n3. Advisory — items noted that are not failures yet but should be monitored or repaired soon",why:"Understanding the MOT is fundamental to light vehicle work. Every customer conversation about vehicle condition references the MOT. MOT testers must be qualified — becoming an MOT tester is an achievable career milestone after 2 years as a qualified technician."},
      {q:"What is the minimum legal tyre tread depth and how do you check it?",a:"The minimum legal tyre tread depth in the UK is 1.6mm across the central three-quarters of the tyre tread, around the entire circumference.\n\nHow to check:\n• Tread depth gauge — the professional method. Insert into the tread groove and read the measurement. Quick, accurate, essential tool.\n• 20p coin test — the quick check. Insert a 20p into the tread groove. If the outer band of the coin is visible, the tread is below 1.6mm.\n• Tread wear indicators — moulded into the tyre tread at 1.6mm depth. When the tread is flush with the indicator, the tyre is at the legal limit.\n\nBest practice: most technicians recommend replacing tyres at 3mm — well before the legal limit — because stopping distances increase significantly below 3mm, especially in wet conditions.\n\nPenalty for driving on illegal tyres: £2,500 fine and 3 penalty points per tyre.",why:"Tyre law is one of the most commonly tested technical topics at motor vehicle interview. Tyres are the only contact point between the vehicle and the road — their condition is directly linked to safety. Every motor vehicle technician must know the legal minimum."},
    ]},
    diagnostics:{label:"Diagnostics",icon:"💻",items:[
      {q:"What is OBD and how does it work?",a:"OBD stands for On-Board Diagnostics. It is a standardised system fitted to all vehicles built after 1996 that monitors vehicle systems and records fault information.\n\nHow it works:\n• The vehicle's Engine Control Unit (ECU) continuously monitors sensors throughout the vehicle\n• When a sensor reading falls outside normal parameters, the ECU records a Diagnostic Trouble Code (DTC) and illuminates a warning light\n• A diagnostic scanner connected to the OBD port (usually under the dashboard, driver's side) can read these codes\n• Codes are standardised — P codes (powertrain), B codes (body), C codes (chassis), U codes (network)\n• Reading the code gives you the starting point for diagnosis — it tells you what system has a problem, not always exactly what the fault is\n\nOBD2 is the current standard (fitted to all petrol vehicles from 1996, diesel from 2004).\n\nImportant: a fault code is not a diagnosis — it is a clue. A P0300 code (random misfire) could be caused by spark plugs, coils, injectors, compression loss or multiple other faults. Good diagnostics means using the code to guide systematic investigation.",why:"OBD knowledge is tested at every motor vehicle interview and used every day in a modern workshop. Demonstrating that you understand OBD — and especially that you know a fault code is not a diagnosis — shows genuine technical thinking."},
      {q:"What is the difference between a multi-meter and an oscilloscope in vehicle diagnostics?",a:"A multi-meter measures electrical values at a point in time:\n• Voltage (DC and AC)\n• Current (amperage)\n• Resistance (ohms)\n• Continuity (is there a complete circuit?)\n\nA multi-meter is the standard tool for basic electrical diagnosis — checking battery voltage, testing fuses, measuring sensor resistance.\n\nAn oscilloscope (or 'scope') displays electrical signals over time as a waveform — a graph of voltage against time. This allows you to see:\n• How a signal changes over time (e.g. a crankshaft position sensor signal)\n• Signal quality (noise, dropouts, timing)\n• Intermittent faults that a multi-meter would miss\n\nA multi-meter tells you the value of an electrical measurement. An oscilloscope shows you how that value behaves over time. For diagnosing complex sensor faults, intermittent issues and communication network problems, the oscilloscope is the more powerful tool.",why:"The distinction between a multi-meter and oscilloscope shows a more sophisticated level of electrical understanding. Most apprentice interviews will not expect oscilloscope knowledge — but demonstrating you know it exists and why it is used shows genuine technical curiosity."},
    ]},
    regulations:{label:"Regulations",icon:"📖",items:[
      {q:"What is a vehicle's VIN and what information does it contain?",a:"VIN stands for Vehicle Identification Number. It is a unique 17-character alphanumeric code assigned to every vehicle at manufacture.\n\nThe VIN contains:\n• Characters 1–3: World Manufacturer Identifier (WMI) — identifies the manufacturer and country of origin\n• Characters 4–9: Vehicle Descriptor Section — identifies the vehicle type, model, engine, body style and restraint systems\n• Character 10: Model year\n• Character 11: Assembly plant\n• Characters 12–17: Sequential production number — the unique number for that specific vehicle\n\nIn practice, the VIN is used to:\n• Verify vehicle identity (check against V5C logbook)\n• Identify the correct parts for a specific vehicle\n• Check vehicle history (stolen vehicle check, mileage discrepancy check)\n• Access manufacturer technical data\n\nLocation: stamped on a plate visible through the windscreen (driver's side), in the door jamb, or on the engine bay bulkhead. Also on the V5C registration document.",why:"VIN knowledge is used every day in a workshop to ensure the right parts are ordered for the right vehicle. Demonstrating VIN knowledge shows you have researched practical workshop processes."},
      {q:"What is the difference between a service and an MOT?",a:"Many customers confuse services and MOTs — understanding the difference is a core customer communication skill.\n\nA service is manufacturer-prescribed maintenance carried out at specific mileage or time intervals. It is not a legal requirement but is essential for vehicle reliability, warranty maintenance and resale value. Services typically include: oil and filter change, air and pollen filter check, spark plug replacement (at specified intervals), brake fluid change (typically every 2 years), visual safety checks, and topping up all fluids.\n\nAn MOT is a legal annual roadworthiness inspection carried out by a licensed MOT testing station. It tests that the vehicle meets minimum road safety standards. It does not include any maintenance work — it only assesses condition.\n\nKey differences:\n• A service maintains the vehicle; an MOT tests it\n• A service is voluntary; an MOT is legally required for vehicles over 3 years old\n• A service can be done at any garage; an MOT must be done at an approved test centre\n• A service does not result in a pass or fail; an MOT does\n\nA vehicle can pass its MOT but still need a service. A vehicle can be fully serviced but fail its MOT.",why:"Explaining the difference between a service and an MOT is one of the most common customer conversations in a motor vehicle workshop. Every technician who interacts with customers must be able to explain this clearly."},
    ]},
  };
  const cat_data=categories[cat];
  const [open,setOpen]=useState(null);
  return (
    <div>
      <PageHeader icon="🔧" title="Technical Knowledge" subtitle="MOT, OBD diagnostics, workshop safety regulations and tyre law — what you must know before every motor vehicle interview."/>
      <InfoBox text="Most candidates at motor vehicle interviews cannot explain LOLER, describe what OBD is or state the minimum tyre tread depth. Knowing these puts you in the top 10% of applicants." type="warning"/>
      <NavTabBar options={Object.entries(categories).map(([k,v])=>({id:k,label:v.icon+" "+v.label}))} active={cat} onSelect={(id)=>{setCat(id);setOpen(null);}}/>
      <div>
        {cat_data.items.map((item,i)=>(
          <div key={i} style={{background:WHITE,border:`1px solid ${open===i?RED:"#E2E8F0"}`,borderRadius:12,overflow:"hidden",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",fontFamily:"inherit",gap:12}}>
              <span style={{color:NAVY,fontWeight:700,fontSize:14,textAlign:"left",lineHeight:1.4}}>{item.q}</span>
              <span style={{color:RED,fontSize:18,flexShrink:0}}>{open===i?"−":"+"}</span>
            </button>
            {open===i&&(
              <div style={{padding:"0 15px 15px",borderTop:"1px solid #F0F4F8"}}>
                <div style={{background:"#FEF2F2",borderLeft:`3px solid ${RED}`,borderRadius:8,padding:"11px 13px",margin:"12px 0 10px"}}>
                  <p style={{color:"#991B1B",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{item.a}</p>
                </div>
                <div style={{background:"#FFFBEB",borderLeft:`3px solid ${AMBER}`,borderRadius:8,padding:"9px 12px"}}>
                  <p style={{color:"#92400E",fontSize:12,lineHeight:1.6,margin:0}}>💡 <strong>Why this matters:</strong> {item.why}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EVModule(){
  const [open,setOpen]=useState(null);
  const items=[
    {title:"Why EV knowledge is the biggest career differentiator right now",content:"Scotland has committed to ending new petrol and diesel car sales by 2030. The number of EVs on Scottish roads is doubling every 18–24 months. The number of technicians qualified to work on high-voltage systems is critically low.\n\nThis creates an immediate skills shortage that employers are actively trying to address. At interview, candidates who demonstrate genuine awareness of EV technology — even at a basic level — stand out from those who have never thought about it.\n\nFor an apprentice starting now:\n• The majority of your career will be spent working on electric and hybrid vehicles\n• EV-qualified technicians are among the best-paid in the sector\n• Manufacturers are competing for EV-trained staff\n• The IMI (Institute of the Motor Industry) EV qualifications are increasingly required — not optional\n\nYou do not need to be an EV expert to impress at interview. You need to demonstrate that you have researched the technology, understand why it matters, and are enthusiastic about developing expertise in it."},
    {title:"High voltage safety — the most critical EV knowledge",content:"Working on high-voltage systems in electric and hybrid vehicles requires specific safety training and cannot be done without it. High voltage in EVs is not like the 12V systems in conventional vehicles — it can kill.\n\nKey facts about EV high voltage:\n• EV battery systems typically operate at 300–800V DC\n• Some commercial vehicles and fast-charging systems operate above 1,000V\n• At 50V DC, current through the heart can cause cardiac arrest\n• EV battery packs can deliver enormous current — the danger is both voltage and energy\n• High-voltage systems remain energised even after the ignition is off unless properly isolated\n\nThe safe working procedure for HV systems:\n1. Identify the vehicle as EV/hybrid before beginning any work\n2. De-energise the high-voltage system using the manufacturer's isolation procedure\n3. Verify isolation using an approved voltage tester — never assume it is isolated\n4. Use insulated tools rated for the voltage\n5. Wear insulated gloves (minimum Cat 0, rated 1,000V) and face protection\n6. Never work alone on HV systems\n7. Display warning signs in the workshop area\n\nIMI (Institute of the Motor Industry) Levels:\n• Level 1 — EV awareness (all technicians working around EVs)\n• Level 2 — EV foundation (technicians who may need to disconnect 12V or access near HV systems)\n• Level 3 — EV technician (full HV system work)\n• Level 4 — EV specialist (complex HV diagnosis and repair)"},
    {title:"How electric motors work — the basics",content:"Understanding how an electric motor works is fundamental to understanding EVs.\n\nA conventional internal combustion engine (ICE) burns fuel to produce heat, which creates pressure to push pistons, which turns a crankshaft. It is thermally inefficient — most of the fuel's energy becomes heat, not motion.\n\nAn electric motor works differently:\n• Electricity flows through coils of wire (stator windings) creating a magnetic field\n• The magnetic field interacts with permanent magnets on the rotating shaft (rotor)\n• The interaction between the stator field and rotor magnets creates torque — rotational force\n• As the motor turns, the controller alternates the direction of current to keep the rotor turning\n\nWhy electric motors are more efficient:\n• No combustion means no heat waste from burning fuel\n• Electric motors convert 85–95% of electrical energy into motion (ICE: typically 20–40%)\n• Electric motors produce maximum torque from zero RPM — instant response\n• Regenerative braking recovers energy when slowing down and returns it to the battery\n\nKey EV motor types:\n• AC induction motor (used by Tesla Model S) — no permanent magnets, robust\n• Permanent magnet synchronous motor (most common in modern EVs) — high efficiency"},
    {title:"EV battery technology — what every technician needs to know",content:"The battery is the most expensive and most safety-critical component of an EV. Understanding it is fundamental to EV work.\n\nLithium-ion battery basics:\n• All modern EV batteries use lithium-ion chemistry in some form\n• Battery packs contain hundreds or thousands of individual cells arranged in modules\n• Cell chemistry types: NMC (Nickel Manganese Cobalt), LFP (Lithium Iron Phosphate), NCA (Nickel Cobalt Aluminium)\n• Battery Management System (BMS) monitors and manages every cell — temperature, voltage, charge state\n\nBattery capacity and range:\n• Capacity measured in kilowatt-hours (kWh) — like litres in a fuel tank\n• Range varies significantly with temperature (cold reduces range), speed (motorway reduces range), heating/air con use\n• State of Charge (SoC) — the current charge level as a percentage\n• State of Health (SoH) — the battery's current capacity as a percentage of new capacity\n\nBattery degradation:\n• All lithium-ion batteries degrade over time and charge cycles\n• Most EV batteries retain 70–80% capacity after 8 years or 100,000 miles\n• Manufacturer warranty typically covers 70% SoH for 8 years\n• Factors that accelerate degradation: frequent fast charging, charging to 100% regularly, deep discharging to 0%, high temperatures\n\nThermal management:\n• Battery performance is highly temperature-dependent\n• Most EV batteries have liquid cooling systems to maintain optimal temperature\n• Cold batteries charge more slowly and deliver less power"},
    {title:"ADAS — Advanced Driver Assistance Systems",content:"ADAS is increasingly standard on modern vehicles and understanding it is increasingly expected of motor vehicle technicians.\n\nCommon ADAS systems:\n• Lane Departure Warning (LDW) — camera detects lane markings, warns if vehicle drifts\n• Lane Keep Assist (LKA) — actively steers to keep vehicle in lane\n• Automatic Emergency Braking (AEB) — detects obstacles and applies brakes automatically\n• Adaptive Cruise Control (ACC) — maintains set speed and distance to vehicle ahead\n• Blind Spot Monitoring (BSM) — warns of vehicles in blind spots\n• Rear Cross Traffic Alert — warns of crossing traffic when reversing\n• Parking sensors and cameras — distance detection during parking\n• Traffic Sign Recognition — reads and displays speed limits\n\nWhy ADAS matters for technicians:\n• ADAS systems require calibration after any work that changes the vehicle's geometry — windscreen replacement, wheel alignment, suspension repair, front body repair\n• Camera calibration requires specialist equipment (ADAS calibration targets) and specific measurement procedures\n• Radar calibration (for ACC and AEB) requires specific alignment\n• Incorrectly calibrated ADAS can be dangerous — the system may not respond correctly\n• ADAS calibration is increasingly a significant revenue source for workshops and a specialist skill\n\nDemonstrating awareness of ADAS calibration requirements at interview shows you have researched modern vehicle technology beyond the basics."},
  ];
  return (
    <div>
      <PageHeader icon="⚡" title="EV and Hybrid Technology" subtitle="The biggest career differentiator in motor vehicle right now — most candidates know nothing about this."/>
      <InfoBox text="You do not need to be an EV expert to impress at interview. You need to demonstrate genuine awareness and enthusiasm for learning. Candidates who say 'I have been researching EV technology because it is the future of the industry' immediately stand out." type="success"/>
      <div>
        {items.map((item,i)=>(
          <div key={i} style={{background:WHITE,border:`1px solid ${open===i?"#F59E0B":"#E2E8F0"}`,borderRadius:10,overflow:"hidden",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:"inherit"}}>
              <span style={{color:NAVY,fontWeight:700,fontSize:14,textAlign:"left"}}>{item.title}</span>
              <span style={{color:AMBER,fontSize:18,flexShrink:0}}>{open===i?"−":"+"}</span>
            </button>
            {open===i&&<div style={{padding:"0 15px 15px",borderTop:"1px solid #F0F4F8"}}><div style={{paddingTop:12}}><p style={{color:"#444",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{item.content}</p></div></div>}
          </div>
        ))}
      </div>
      <Card style={{marginTop:4}}>
        <p style={{color:AMBER,fontWeight:700,fontSize:12,margin:"0 0 10px",textTransform:"uppercase"}}>Free EV learning resources</p>
        {[
          {name:"IMI EV Awareness (Level 1)",desc:"Free online awareness course from the Institute of the Motor Industry. Completing it before your interview and mentioning it is a genuine differentiator. Available at theimi.org.uk"},
          {name:"Autoelectro EV Guide",desc:"Free technical guide to electric vehicle systems — covers motors, batteries, charging systems and safety. Available at autoelectro.co.uk"},
          {name:"Bosch EV Training",desc:"Free online EV fundamentals training from Bosch — a major automotive supplier. Available at boschaftermarket.com"},
          {name:"YouTube: EV diagnostics channels",desc:"'howtodiagnose.com', 'Training Force', 'Automotive Technician Training' — free video content on EV systems and diagnostics"},
        ].map((r,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:10,paddingBottom:10,borderBottom:i<3?"1px solid #F0F4F8":"none",alignItems:"flex-start"}}>
            <div style={{width:5,height:5,background:AMBER,borderRadius:99,flexShrink:0,marginTop:5}}/>
            <div><p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"0 0 2px"}}>{r.name}</p><p style={{color:MID,fontSize:12,margin:0}}>{r.desc}</p></div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function EmployersModule(){
  const employers=[
    {id:"arnold",name:"Arnold Clark",icon:"🚗",sector:"Multi-franchise Dealer Group",location:"200+ sites across Scotland and UK",desc:"Scotland's largest private company and the UK's largest independent motor dealer. Founded in Glasgow in 1954 by Arnold Clark. Over 200 dealerships representing 26+ manufacturers. Employs approximately 12,000 people UK-wide with a major Scottish presence. One of the most structured and comprehensive apprenticeship programmes in the UK.",apprenticeships:"Light Vehicle Technician, MOT Tester pathway, EV and Hybrid Technician, Parts Advisor, Body Repair",why:"Arnold Clark's University programme is one of the most respected automotive apprenticeship schemes in the UK. Manufacturer-specific training at major brands, structured progression, competitive pay and a genuine internal career pathway. The name on your CV carries weight across the industry.",apply:"Arnold Clark Careers website (arnoldclark.com/careers). Arnold Clark University — dedicated apprenticeship portal. Recruitment year-round with major August and January intakes."},
    {id:"kwikfit",name:"Kwik Fit",icon:"🔄",sector:"Fast-Fit Centres",location:"150+ centres across Scotland",desc:"Founded in Edinburgh in 1971 — a genuinely Scottish success story. Kwik Fit is the UK's largest fast-fit and tyre specialist. Offers a high-volume, fast-paced environment with strong customer service focus. Recently expanded into EV servicing at select centres.",apprenticeships:"Vehicle Fitter, Tyre Technician, Vehicle Fitting apprenticeship pathway",why:"Kwik Fit's Scottish origins mean it has a particular commitment to Scottish apprenticeship. The volume of work — tyres, brakes, exhausts, batteries — develops speed and customer communication skills rapidly. Strong internal progression to centre manager.",apply:"Kwik Fit Careers website (kwik-fit.com/careers). Ongoing recruitment across Scotland."},
    {id:"macklin",name:"Macklin Motors",icon:"🏎️",sector:"Multi-franchise Dealer Group",location:"Multiple sites across Scotland",desc:"Scottish-owned and Scottish-focused dealer group representing brands including Nissan, Renault, Dacia, Fiat, Alfa Romeo, Jeep and Mitsubishi. Part of the Vertu Motors group. Strong commitment to Scottish apprenticeship development.",apprenticeships:"Light Vehicle Technician, Parts Advisor, Service Advisor",why:"Macklin's Scottish ownership and Scottish focus means the company understands Scotland's automotive market. Apprentices at Macklin benefit from manufacturer training from multiple brands.",apply:"Macklin Motors Careers website and apprenticeships.scot."},
    {id:"johnclark",name:"John Clark Motor Group",icon:"🚙",sector:"Multi-franchise Dealer Group",location:"Edinburgh, Aberdeen, Kirkcaldy, Dunfermline",desc:"Scottish-owned dealer group representing BMW, MINI, Jaguar, Land Rover, Volvo and other premium brands across Scotland. Established Scottish business with a reputation for quality and staff development.",apprenticeships:"Light Vehicle Technician (BMW/MINI, JLR, Volvo), Parts Advisor",why:"Premium manufacturer brands (BMW, Land Rover) offer the most technically advanced training in the industry, particularly for EV and hybrid systems. BMW and JLR are leaders in electrification. Training at John Clark provides access to manufacturer master technician pathways.",apply:"John Clark Motor Group Careers website. Recruitment typically August and January."},
    {id:"lookers",name:"Lookers",icon:"🚐",sector:"Multi-franchise Dealer Group",location:"Multiple Scottish sites (Ford, Vauxhall, Volkswagen, Audi)",desc:"One of the UK's largest dealer groups with significant Scottish presence representing Ford, Vauxhall, Volkswagen, Audi and other brands. Part of a major PLC with structured training frameworks.",apprenticeships:"Light Vehicle Technician, Parts Advisor, MET Technician",why:"Lookers' scale and manufacturer partnerships provide access to factory training programmes. Volkswagen Group (VW, Audi) are among the leaders in EV technology — apprentices working on these brands develop the most relevant future skills.",apply:"Lookers Careers website (lookers.co.uk/careers). Apprenticeships advertised on apprenticeships.scot."},
    {id:"stagecoach",name:"Stagecoach",icon:"🚌",sector:"Public Transport — Heavy Vehicle",location:"Multiple Scottish depots (Perth HQ)",desc:"Stagecoach is headquartered in Perth and operates bus services across Scotland. Significant heavy vehicle maintenance operation across multiple depots. Increasingly operating electric and hydrogen buses — highly relevant for future EV skills.",apprenticeships:"Heavy Vehicle Technician, Bus and Coach Technician",why:"Stagecoach's investment in zero-emission buses makes this an excellent employer for candidates interested in EV and alternative fuel technology. Heavy vehicle qualification with a public service dimension. Perth HQ and Scottish depots across the country.",apply:"Stagecoach Careers website (stagecoachbus.com/careers) and apprenticeships.scot."},
    {id:"firstgroup",name:"FirstGroup",icon:"🚎",sector:"Public Transport — Heavy Vehicle",location:"Multiple Scottish depots",desc:"FirstGroup operates First Bus services across Scotland. Like Stagecoach, investing significantly in electric and hydrogen buses. Engineering depot roles across Scotland.",apprenticeships:"Heavy Vehicle Technician, Bus Engineer",why:"Electric bus technology is at the cutting edge of heavy vehicle engineering. FirstGroup's investment in zero-emission fleets makes this an excellent environment for technicians who want to be at the forefront of the EV transition in commercial vehicles.",apply:"FirstGroup Careers website and apprenticeships.scot."},
  ];
  const [active,setActive]=useState("arnold");
  const e=employers.find(x=>x.id===active)||employers[0];
  return (
    <div>
      <PageHeader icon="🏭" title="Scottish Employers" subtitle="The major motor vehicle employers in Scotland — who they are, what they offer and how to apply."/>
      <InfoBox text="Research your target employer before applying. Knowing which manufacturer brands a dealership represents, their EV commitment and something specific about their training programme immediately differentiates your application." type="tip"/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
        {employers.map(em=>(
          <button key={em.id} onClick={()=>setActive(em.id)} style={{background:active===em.id?NAVY:WHITE,color:active===em.id?WHITE:MID,border:`1px solid ${active===em.id?NAVY:"#E2E8F0"}`,borderRadius:20,padding:"6px 10px",fontSize:10,fontWeight:active===em.id?800:400,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>
            {em.icon} {em.name.split(" ")[0]}
          </button>
        ))}
      </div>
      <Card>
        <p style={{color:RED,fontWeight:800,fontSize:15,margin:"0 0 4px"}}>{e.icon} {e.name}</p>
        <p style={{color:MID,fontSize:12,margin:"0 0 10px"}}>{e.sector} · {e.location}</p>
        <p style={{color:"#444",fontSize:13,lineHeight:1.65,margin:"0 0 14px"}}>{e.desc}</p>
        {[["Apprenticeships",e.apprenticeships],["Why apply here",e.why],["How to apply",e.apply]].map(([label,val],i)=>(
          <div key={i} style={{display:"flex",gap:12,padding:"9px 0",borderBottom:i<2?"1px solid #F0F4F8":"none"}}>
            <span style={{color:MID,fontSize:11,fontWeight:700,textTransform:"uppercase",minWidth:110,flexShrink:0}}>{label}</span>
            <span style={{color:NAVY,fontSize:13,lineHeight:1.5}}>{val}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function CyclesModule(){
  return (
    <div>
      <PageHeader icon="📅" title="Recruitment Cycles" subtitle="When Scottish automotive employers hire — manufacturer academies, August and January intakes."/>
      <InfoBox text="The best automotive apprenticeship places are filled months before the start date. Candidates who apply in January for an August start consistently outperform those who apply when they see a vacancy in July." type="warning"/>
      <Accordion accent={RED} items={[
        {title:"The recruitment calendar — employer by employer",content:"Automotive recruitment in Scotland follows a broadly predictable pattern:\n\nAugust start (school leavers — main intake):\n• Applications open: October–January of the preceding academic year\n• Peak hiring: January–April\n• Offers made: February–May\n• Start date: August–September\n• Who recruits: Arnold Clark University, main dealerships (BMW at John Clark, VW/Audi at Lookers, Ford at Lookers), Kwik Fit\n\nJanuary start (secondary intake):\n• Applications open: August–October\n• Peak hiring: September–November\n• Offers made: October–December\n• Start date: January\n• Who recruits: Arnold Clark (rolling intake), larger dealer groups, fast-fit chains\n\nRolling recruitment (year-round):\n• Arnold Clark — accepts applications continuously\n• Kwik Fit — ongoing recruitment across 150+ Scottish centres\n• Independent garages — advertise when vacancies arise, no fixed window\n• Heavy vehicle operators (Stagecoach, FirstGroup) — rolling recruitment\n\nManufacturer academies:\nBMW Group, Volkswagen Group, Ford, Vauxhall and other manufacturers run their own apprenticeship academies through their dealer networks. Applications are made through the manufacturer's national programme, not just the dealership. These are the most competitive and most prestigious motor vehicle apprenticeships available.\n\nBMW Group Apprenticeship Programme — apply at bmw.co.uk/en/topics/offers-and-services/bmw-group-uk-careers\nVolkswagen Group Academy — apply at volkswagengroup-careers.co.uk\nFord EMEA Apprenticeship — through Ford dealer network"},
        {title:"Company research — how to approach it",content:"Researching your target employer before applying is not optional — it is the difference between a successful and unsuccessful application.\n\nHow to research effectively:\n• Which manufacturer brands does the dealership represent? Research those manufacturers' EVs and technology direction.\n• What apprenticeship programme does the employer offer? Manufacturer academy or in-house?\n• Have they won any awards? Autocar, What Car, manufacturer dealer of the year awards signal quality.\n• What does their workshop look like? Some dealerships have photos on their website or social media.\n• What are their customer reviews like? A dealership with excellent customer reviews trains technicians who communicate well — a real differentiator.\n• Have they recently invested in EV equipment? Charging points, EV-specific lifts, diagnostic equipment?\n\nUsing your personal network:\nDo you know anyone who works in the motor trade? A family member, neighbour, friend's parent who works in a garage or dealership? A 10-minute conversation with someone in the industry gives you insights no website can provide. Ask them: What do employers really look for? What mistakes do applicants make? What would genuinely impress at interview?"},
        {title:"Speculative applications — how to approach them",content:"Many of the best apprenticeship opportunities — especially at smaller independent garages and specialist workshops — are never formally advertised. A well-executed speculative application can get you opportunities you could never reach through job boards.\n\nHow to make a speculative application:\n1. Identify your target garage or dealership specifically — not 'garages in my area' but a named, specific business.\n2. Find the right person — for a dealership: the Service Manager or Workshop Controller. For an independent: the owner or senior technician.\n3. Write a short, specific covering letter — mention the garage by name, why you specifically want to work there, and what you can offer.\n4. Phone to follow up 5–7 days later.\n\nWhat to say when you call:\n'Good morning, I am calling to follow up on a speculative application I sent to [name] last week. I am looking for a motor vehicle apprenticeship and I would be grateful for a few minutes of your time to discuss whether there might be an opportunity.'\n\nTiming: September and January are the best times for speculative applications — when the previous cohort has settled in and managers are thinking about new intake."},
      ]}/>
    </div>
  );
}

function MJSModule(){
  const [section,setSection]=useState("overview");
  const sections={
    overview:{label:"Overview",content:"MyJobScotland is the primary recruitment portal for all 32 Scottish councils, NHS Scotland, Police Scotland and other public sector organisations.\n\nFor motor vehicle apprenticeships, MyJobScotland covers an important and often overlooked segment of the sector:\n\nScottish council fleets — every council operates a vehicle fleet. City of Edinburgh Council, Glasgow City Council, Highland Council, Fife Council, Aberdeenshire Council and others maintain everything from refuse trucks to road gritters. Light vehicle and heavy vehicle technician roles are regularly advertised.\n\nNHS Scotland fleet — NHS Greater Glasgow and Clyde, NHS Lothian, NHS Grampian and other health boards maintain large vehicle fleets including ambulances, patient transport vehicles and staff vehicles. Vehicle technician and fleet maintenance roles available.\n\nPolice Scotland — Police Scotland maintains one of the largest vehicle fleets in Scotland. Fleet technician roles include standard police vehicles and specialist vehicles.\n\nScottish Ambulance Service — maintains a fleet of ambulances, rapid response vehicles and patient transport across Scotland. Vehicle technician roles are safety-critical and well-regarded.\n\nScottish Fire and Rescue — fire engine and specialist vehicle maintenance. Highly safety-critical technical work.\n\nTransport Scotland — maintains road infrastructure vehicles and specialist equipment.\n\nPublic sector advantages:\n• Job security — public sector fleet roles are typically permanent\n• Local Government pension scheme — among the best available\n• Predictable hours — more regular schedules than main dealer work\n• Variety of vehicles — council fleets operate diverse vehicle types",tip:"Set alerts on MyJobScotland for 'vehicle technician', 'fleet technician', 'motor vehicle apprentice', 'mechanical fitter'. Public sector fleet roles are often undersubscribed compared to commercial roles — strong candidates have a genuine advantage."},
    statement:{label:"Supporting Statement",content:"Public sector motor vehicle applications via MyJobScotland require a supporting statement — scored against a person specification.\n\nEvery Essential criterion is a potential mark. Treat it like a scored exam.\n\nHow to write it:\n1. Print the person specification and highlight every Essential criterion\n2. For each criterion, write one paragraph of evidence using STAR\n3. Use the exact language from the person specification\n4. Address criteria in the order they appear\n5. Keep to 500–700 words maximum\n\nCommon criteria in public sector motor vehicle applications:\n• Interest in and aptitude for mechanical or technical work\n• Ability to follow instructions accurately and safely\n• Ability to work as part of a team\n• Commitment to health and safety in the workplace\n• Ability to communicate effectively with colleagues and the public\n• Willingness to undertake training and development\n\nFor 'interest in and aptitude for mechanical or technical work': give a specific example — a vehicle or machine you have worked on at home, a school project, work experience, anything that demonstrates hands-on technical curiosity. Do not make general statements.\n\nFor 'commitment to health and safety': mention specific knowledge — COSHH, LOLER, PPE requirements. Even researching these before applying demonstrates commitment.",tip:"Public sector fleet roles often have less glamour than main dealer work but offer excellent stability, pension and work-life balance. Many technicians who start in public sector fleet roles stay for their entire career. These are not fallback options — they are genuine career choices."},
  };
  const s=sections[section];
  return (
    <div>
      <PageHeader icon="🏛️" title="MyJobScotland Guide" subtitle="Council fleet, NHS fleet, Police Scotland — public sector motor vehicle roles."/>
      <NavTabBar options={Object.entries(sections).map(([k,v])=>({id:k,label:v.label}))} active={section} onSelect={setSection}/>
      <Card>
        <p style={{color:TEAL,fontWeight:700,fontSize:13,margin:"0 0 10px",textTransform:"uppercase"}}>{s.label}</p>
        <p style={{color:"#444",fontSize:13,lineHeight:1.75,margin:"0 0 14px",whiteSpace:"pre-line"}}>{s.content}</p>
        <div style={{background:"#FFFBEB",borderLeft:`3px solid ${AMBER}`,borderRadius:8,padding:"9px 12px"}}>
          <p style={{color:"#92400E",fontSize:13,lineHeight:1.6,margin:0}}>💡 {s.tip}</p>
        </div>
      </Card>
      {section==="statement"&&(
        <>
          <p style={{color:NAVY,fontWeight:800,fontSize:12,textTransform:"uppercase",letterSpacing:0.5,margin:"16px 0 10px"}}>Supporting statement — weak vs strong</p>
          <ExampleToggle
            weak="I am applying for this motor vehicle apprenticeship because I have always been interested in cars and I enjoy practical work. I have helped my dad fix our car and I think I would be good at this. I am hardworking and I learn quickly."
            strong="I am applying for the Vehicle Technician Apprenticeship with City of Edinburgh Council Fleet Services because I want to develop professional mechanical skills within a large fleet operation that keeps essential public services running.\n\nIn response to the Essential criterion 'interest in and aptitude for mechanical or technical work', I draw on two years of regular involvement in maintaining a 1998 Honda Civic with my uncle, who is a qualified mechanic. I have changed brake pads, replaced a water pump and carried out full oil and filter services under his supervision. I have developed the ability to read workshop manuals, identify the correct parts and work methodically through a procedure.\n\nIn response to the criterion 'commitment to health and safety in the workplace', I am aware that workshop safety is governed by COSHH, LOLER and PUWER regulations. I understand that vehicle lifts are subject to LOLER six-monthly inspections and that safe working loads must never be exceeded. I have researched the PPE requirements for workshop tasks including correct footwear, gloves for chemical handling and eye protection for grinding.\n\nI am specifically attracted to council fleet work because the variety of vehicles — from cars to refuse trucks — offers broader technical exposure than a single-manufacturer dealership."
            weakLabel="Weak statement"
            strongLabel="Strong statement"
          />
        </>
      )}
    </div>
  );
}

function CVModule(){
  const [cohort,setCohort]=useState("school");
  const cvs={
    school:{label:"School Leaver (16–18)",
      profile:{
        weak:"I am 16 and I want to do a motor vehicle apprenticeship. I love cars and I am practical. I have helped my dad fix our car and I am a hard worker. I think I would be great at this.",
        strong:"Mechanically minded 17-year-old with two years of hands-on vehicle maintenance experience working alongside a qualified mechanic uncle on a 1998 Honda Civic — including brake pad replacement, water pump change and routine servicing. Achieved National 5 Engineering Science (A) and National 5 Mathematics (B). Completed the IMI EV Awareness (Level 1) online module (2024) in preparation for the EV transition. Seeking a Light Vehicle Technician Apprenticeship with Arnold Clark's BMW programme at John Clark Motor Group — specifically motivated by BMW's leadership in electric vehicle technology and the manufacturer master technician pathway."},
      experience:{
        weak:"I have helped fix cars with my uncle who is a mechanic. I have changed oil and done other jobs. I am interested in how engines work and I watch YouTube videos about cars.",
        strong:"Vehicle Maintenance — Honda Civic Project (ongoing, 2022–present)\n• Working alongside my uncle (qualified technician, 22 years experience) on a 1998 Honda Civic D16 engine\n• Completed under supervision: full oil and filter service, brake pad and disc replacement (front axle), coolant flush and fill, water pump replacement (including cam belt removal and refitting)\n• Learned to read workshop manuals, use torque wrenches correctly, and diagnose faults using fault codes and systematic elimination\n• All work documented in a maintenance log with photographs — available to show at interview\n\nSchool Engineering Project (2023–2024)\n• Designed and fabricated a steel bracket assembly as part of National 5 Engineering Science practical assessment\n• Used pillar drill, bench grinder and MIG welder (under supervision) in school workshop\n• Achieved highest grade in the year group for practical assessment\n• Assessed as 'demonstrating safety awareness beyond what was required for the assignment'"}},
    college:{label:"College Leaver / HNC (18–22)",
      profile:{
        weak:"I have completed my HNC in Engineering and I am now looking for a motor vehicle apprenticeship. I have a good technical foundation and I am ready to work in a professional workshop.",
        strong:"HNC Mechanical Engineering graduate (Merit, City of Glasgow College, 2024) seeking a Light Vehicle Technician Modern Apprenticeship to convert academic engineering knowledge into professional automotive qualification. Achieved Merit in Thermodynamics and Fluid Power modules. Six-week industry placement at an Arnold Clark Glasgow dealership (2024) — servicing and basic diagnostics on the workshop floor under a senior technician. Completed IMI EV Awareness Level 1 (2024) and currently working through IMI EV Foundation Level 2 online. Proficient in engineering drawings, tolerances, basic electrical principles. Specifically targeting the Volkswagen Group Academy programme through Lookers — VW Group's commitment to electrification (ID.3, ID.4, e-Golf) directly aligns with my interest in EV technology."},
      experience:{
        weak:"I did work experience at a car dealership as part of my HNC. I watched technicians work and carried out some tasks. I got positive feedback and I learned a lot about how a real workshop operates.",
        strong:"Industry Placement, Arnold Clark — Glasgow (6 weeks, April–May 2024)\n• Worked in the service workshop at an Arnold Clark dealership under a senior technician\n• Carried out: full services on 5 vehicles (oil, filters, fluid checks, safety inspection), tyre removal and fitting, brake pad inspection and measurement on 8 vehicles, OBD scanner connection and fault code reading on 3 vehicles\n• Identified a brake fluid contamination issue on a vehicle that had been booked in for a routine service — reported to senior technician, confirmed and resolved before the vehicle left the workshop\n• Placement report: 'Demonstrated exceptional attention to detail and safety awareness. Would be recommended for employment.'\n\nHNC Thermodynamics Project (2024)\n• Designed and analysed a diesel engine heat rejection system for a fictional fleet application\n• Applied heat transfer principles (conduction, convection, radiation) to size a cooling system\n• Submitted as a formal engineering report — awarded Merit grade"}},
    changer:{label:"Career Changer (25+)",
      profile:{
        weak:"I have been working in a different industry for several years but cars have always been my passion. I have decided to make the change to motor vehicle and I am applying for an apprenticeship to get a formal qualification.",
        strong:"Construction plant operative with 8 years of mechanical hands-on experience maintaining heavy equipment on construction sites, now pursuing a Motor Vehicle Modern Apprenticeship to formalise transferable mechanical skills and qualify in light vehicle technology. Experienced with diesel engines, hydraulic systems, electrical fault diagnosis and safe working procedures on large machinery. Completed IMI EV Awareness Level 1 (2024) and National 5 Engineering Science by distance learning (2023, Grade B) to demonstrate academic readiness. Full UK driving licence held for 7 years. Motivated specifically by the EV transition — the skills shortage in high-voltage qualified technicians represents exactly the kind of emerging opportunity I want to position myself at the forefront of."},
      experience:{
        weak:"I have worked on construction machinery for 8 years and I have a good understanding of how engines and hydraulic systems work. I have also worked on my own cars in my spare time.",
        strong:"Plant Operative / First-Line Maintenance, Balfour Beatty — Various Scottish sites (Mar 2016–present)\n• Responsible for daily pre-use inspection and first-line maintenance of excavators, dumpers and compactors on active construction sites\n• Diagnosed and rectified hydraulic faults (hose failure, cylinder seal replacement, pump pressure testing) on multiple occasions, reducing contractor call-out costs\n• Maintained maintenance logs in compliance with LOLER and PUWER requirements — all plant subject to 6-monthly thorough examination\n• Trained 4 new operatives in pre-use inspection procedures and safe working around plant\n\nPersonal Vehicle Projects (ongoing)\n• Maintained and repaired two personal vehicles — a 2005 Toyota Yaris and a 2012 Ford Focus\n• Self-taught: brake system overhaul, suspension components (wishbone, track rod end replacement), alternator replacement, OBD diagnostics using budget scanner\n• Completed IMI EV Awareness Level 1 (theimi.org.uk, 2024) — researching further EV qualification options"}}
  };
  const c=cvs[cohort];
  return (
    <div>
      <PageHeader icon="📄" title="CV Builder" subtitle="Three complete profiles with weak and strong examples — school leaver, college leaver and career changer."/>
      <InfoBox text="Include any hands-on mechanical experience however informal — home vehicle maintenance, plant machinery, agricultural equipment, school engineering projects. Any evidence of technical hands-on work belongs on your CV." type="tip"/>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {Object.entries(cvs).map(([k,v])=>(
          <button key={k} onClick={()=>setCohort(k)} style={{background:cohort===k?NAVY:WHITE,color:cohort===k?WHITE:MID,border:`1px solid ${cohort===k?NAVY:"#E2E8F0"}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",fontFamily:"inherit",flex:1,fontWeight:700,fontSize:12}}>
            {v.label.split(" (")[0]}
          </button>
        ))}
      </div>
      <p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"0 0 10px",textTransform:"uppercase",letterSpacing:0.5}}>Personal Profile — {c.label}</p>
      <ExampleToggle weak={c.profile.weak} strong={c.profile.strong} weakLabel="Weak profile" strongLabel="Strong profile"/>
      <p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"16px 0 10px",textTransform:"uppercase",letterSpacing:0.5}}>Experience — {c.label}</p>
      <ExampleToggle weak={c.experience.weak} strong={c.experience.strong} weakLabel="Weak experience" strongLabel="Strong experience"/>
      <Card style={{marginTop:8}}>
        <p style={{color:TEAL,fontWeight:700,fontSize:12,margin:"0 0 10px",textTransform:"uppercase"}}>Motor vehicle CV checklist</p>
        {["Specific employer named in personal profile — not just 'a motor vehicle employer'","Specific pathway named — light vehicle, heavy vehicle, body repair etc.","Any hands-on mechanical experience included — however informal","IMI EV Awareness Level 1 mentioned if completed (free, do it before applying)","National 5 Maths and Engineering Science or Physics listed if achieved","Full UK driving licence listed if held","Every experience bullet starts with an action verb","At least one bullet quantifies an outcome or scale","'I' used throughout — not 'we'","CV saved as PDF — Firstname_Lastname_CV.pdf"].map((item,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:7,alignItems:"flex-start"}}>
            <div style={{width:18,height:18,border:`2px solid ${TEAL}`,borderRadius:4,flexShrink:0,marginTop:1}}/>
            <p style={{color:"#444",fontSize:13,lineHeight:1.5,margin:0}}>{item}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}

const STAR_EXAMPLES=[
  {label:"Diagnostic problem",question:"Tell me about a time you solved a technical or mechanical problem.",
   weak:"I fixed a problem with my bike once. The gears were not working properly so I adjusted them and they worked fine after that.",
   good:"The brakes on my car were making a grinding noise. I investigated and found the front brake pads were worn through to metal. I replaced the pads and discs on both sides and the noise stopped.",
   strong:"My uncle's 2003 Ford Transit van developed an intermittent starting fault — it would sometimes not start at all and then start perfectly moments later. Rather than guessing, I approached it systematically.\n\nI started by asking him to describe exactly when the fault occurred — cold starts, warm starts, after it had been standing. He said it was mainly on cold mornings but not always. I then used an OBD scanner to check for fault codes — there was a stored code P0335 (crankshaft position sensor circuit malfunction).\n\nI researched what the crankshaft position sensor does — it sends a signal to the ECU to trigger ignition timing. An intermittent fault in this circuit would cause exactly the starting behaviour he described. I checked the sensor wiring for damage or corrosion, found a section of the loom with cracked insulation near the exhaust manifold, which was causing the intermittent open circuit when the metal contracted in cold temperatures.\n\nI repaired the wiring, cleared the fault code and the van has started reliably for 8 months since. My uncle later said the van had had that fault for over a year and two garages had not identified the cause.\n\nWhat I learned is that the fault code gives you the starting point — not the answer. The diagnosis required understanding how the sensor worked, what the failure mode would look like, and a physical inspection to find the actual fault.",
   why:"The strong answer demonstrates a systematic diagnostic approach — symptom collection, OBD code reading, understanding the component function, physical inspection finding the actual fault, and repair. This is exactly how good technicians think. The detail about two previous garages not finding the fault is particularly powerful — it shows diagnostic thinking that exceeded qualified professionals."},
  {label:"Safety awareness",question:"Tell me about a time you identified or managed a safety risk in a practical situation.",
   weak:"I noticed a wet floor at work and put a sign near it so people would not slip. I also told my manager about it.",
   good:"At my work experience placement, I noticed that a technician had left a vehicle on a two-post lift without engaging the safety locks after positioning the car. I pointed it out to my supervisor who spoke to the technician and had them engage the locks before continuing.",
   strong:"During my six-week work placement at an Arnold Clark dealership, I was assisting a senior technician with a brake disc and pad replacement on a Toyota RAV4 that was on a two-post lift.\n\nBefore we started work, I was checking the tools and noticed that one of the lift arms appeared to be positioned under the door sill rather than on the manufacturer's designated jacking point marked in the owner's manual — which I had checked earlier when the technician asked me to look up the service data.\n\nI was hesitant to say something — the technician was experienced and I was only on placement — but I understood that incorrect lift point positioning could cause the vehicle to slip or damage the sill structure, and either outcome while we were underneath was potentially serious.\n\nI told the technician what I had noticed and showed him the jack point diagram from the service data. He checked, confirmed I was right, repositioned the lift arm correctly and thanked me for catching it. He explained that it was easy to misread the lift points on that particular body style.\n\nAfterwards the workshop manager mentioned it to me and said that raising it was exactly the right thing to do regardless of experience level. The experience reinforced something I believe strongly: in a workshop, the hierarchy stops at safety.",
   why:"This answer demonstrates specific knowledge of lift safety (LOLER, correct jacking points), the courage to raise a concern when more experienced people were present, and a principle-based reflection on safety culture. The final line — 'the hierarchy stops at safety' — is the kind of thinking that workshop managers want to hear from apprentice candidates."},
  {label:"Customer communication",question:"Describe a time you explained something technical to someone who did not have a technical background.",
   weak:"My mum asked me to explain why her car needed new tyres. I explained that the tread was worn down and it was not safe. She understood and agreed to get them replaced.",
   good:"My aunt called me because a garage had told her she needed new front brake pads and she was not sure whether to believe them. I asked her to describe what the car was doing — she mentioned a slight squealing sound when braking. I explained that modern brake pads have a wear indicator that squeals when they reach minimum thickness, that this is designed as a warning, and that continuing to drive without replacing them would damage the discs and cost significantly more to fix. She went ahead with the replacement.",
   strong:"My neighbour called me after receiving a vehicle health check from a main dealer showing an advisory for 'slight weeping from front shock absorber'. She was unsure whether it was genuine or an unnecessary upsell and could not evaluate it herself.\n\nRather than just tell her my opinion, I asked her a few questions first: Had she noticed any change in handling, particularly over bumps? Had she felt the car bouncing more than usual or pulling to one side? She said yes — the car did feel a bit bouncy over speed bumps recently.\n\nI explained the function of a shock absorber using an analogy she understood: 'The spring in your suspension absorbs the bump, but the shock absorber stops the spring bouncing back repeatedly. A weeping shock absorber means it is losing hydraulic fluid and starting to lose its damping ability — which is why you are feeling more bounce.' I also explained the safety implication — a compromised shock absorber increases stopping distances and reduces directional stability, particularly in an emergency.\n\nI told her that a slight weep is a genuine advisory — it does not need immediate replacement but should be monitored and replaced before the next MOT. I showed her how to check for fluid on the shock absorber body herself so she could monitor it.\n\nShe went back to the dealer for a second quote, comparing prices herself, and felt confident enough to make the decision. She thanked me for explaining it in a way that gave her genuine understanding rather than just a decision to make.",
   why:"This answer demonstrates multiple skills simultaneously: technical knowledge (shock absorber function and safety implications), customer communication (analogy to explain a technical concept), diagnostic thinking (asking symptom questions before advising), and a commitment to empowering the customer rather than just telling them what to do. This is the customer communication approach that service managers specifically value."},
  {label:"EV self-directed learning",question:"Tell me about a time you taught yourself something technical or that you researched a topic you did not know about.",
   weak:"I watched a lot of YouTube videos about electric cars because I knew they were the future and I wanted to understand them. I have learned quite a lot about how they work.",
   good:"I decided to research electric vehicles properly because I knew it was going to be important for my career. I found the IMI EV Awareness course online and completed it. I also read some articles and watched some technical videos. I now have a basic understanding of how EV motors and batteries work.",
   strong:"When I decided I wanted to pursue a motor vehicle apprenticeship, I identified that EVs were the most important area of change in the industry and that most applicants my age would know very little about them specifically.\n\nI set myself a structured 6-week research programme. Week 1 and 2: completed the IMI EV Awareness Level 1 online module — this gave me the regulatory and safety foundation. I discovered that EV high-voltage systems typically operate at 300–800V and that working on them without specific training is both illegal and potentially fatal.\n\nWeek 3 and 4: I focused on understanding how the drivetrain works differently from a conventional vehicle. I found Bosch's free EV technical training and worked through their motor and battery modules. I learned the difference between AC induction motors and permanent magnet synchronous motors, and why regenerative braking is more efficient than friction braking.\n\nWeek 5 and 6: I focused on ADAS — a related technology I had not previously considered. I researched what calibration means for camera and radar systems and why suspension work or windscreen replacement on an ADAS-equipped vehicle requires recalibration.\n\nI documented my learning in a notebook that I can bring to interview. When I applied to Arnold Clark, I was able to speak specifically about IMI qualification levels, high-voltage safety procedures and the difference between BEV and PHEV drivetrains. The interviewer said I was the most technically prepared applicant they had seen at my level of experience.",
   why:"This answer is the most powerful one in this bank because it is precisely calibrated to the biggest differentiator in motor vehicle right now. The structured approach (week-by-week plan), the specific resources named (IMI, Bosch), the safety awareness (300-800V, illegal to work without training), the ADAS extension, the documentation, and the interview outcome all combine into an answer that demonstrates exactly the kind of proactive, self-directed learning that motor vehicle employers are desperate to find."},
];

function STARModule(){
  const [active,setActive]=useState(0);
  const [tier,setTier]=useState("strong");
  const ex=STAR_EXAMPLES[active];
  const tierCol={weak:RUST,good:AMBER,strong:GREEN};
  const tierBg={weak:"#FEF2F2",good:"#FFFBEB",strong:"#F0FDF4"};
  return (
    <div>
      <PageHeader icon="⭐" title="STAR Examples" subtitle="Four motor vehicle-specific worked examples across three quality levels."/>
      <InfoBox text="Use 'I' not 'we'. Describe what YOU did and what difference YOUR actions made. Interviewers assess you specifically — not your team or your uncle." type="warning"/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {[{l:"S",w:"Situation",d:"Set the scene briefly."},{l:"T",w:"Task",d:"Your specific role."},{l:"A",w:"Action",d:"What YOU did. Use 'I'. 50% of answer."},{l:"R",w:"Result",d:"Outcome + what you learned."}].map((item,i)=>(
          <div key={i} style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:10,padding:12}}>
            <div style={{width:30,height:30,borderRadius:6,background:RED,color:WHITE,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,marginBottom:6}}>{item.l}</div>
            <p style={{color:NAVY,fontWeight:700,fontSize:12,margin:"0 0 3px",textTransform:"uppercase"}}>{item.w}</p>
            <p style={{color:MID,fontSize:12,margin:0}}>{item.d}</p>
          </div>
        ))}
      </div>
      <NavTabBar options={STAR_EXAMPLES.map((e,i)=>({id:i,label:e.label}))} active={active} onSelect={(id)=>{setActive(id);setTier("strong");}}/>
      <Card><p style={{color:MID,fontSize:11,textTransform:"uppercase",margin:"0 0 5px"}}>Interview question</p><p style={{color:NAVY,fontWeight:800,fontSize:15,margin:0}}>"{ex.question}"</p></Card>
      <div style={{display:"flex",gap:6,marginBottom:12}}>
        {["weak","good","strong"].map(t=>(
          <button key={t} onClick={()=>setTier(t)} style={{flex:1,padding:"8px 4px",background:tier===t?tierCol[t]:WHITE,border:`2px solid ${tierCol[t]}`,color:tier===t?(t==="good"?NAVY:WHITE):tierCol[t],borderRadius:8,fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>
            {t==="weak"?"✗ Weak":t==="good"?"◎ Good":"✓ Strong"}
          </button>
        ))}
      </div>
      <div style={{background:tierBg[tier],borderLeft:`3px solid ${tierCol[tier]}`,borderRadius:10,padding:14,marginBottom:12}}>
        <p style={{color:tierCol[tier],fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 8px"}}>{tier==="weak"?"Weak answer":tier==="good"?"Good answer":"Strong answer"}</p>
        <p style={{color:"#333",fontSize:14,lineHeight:1.75,margin:0,fontStyle:"italic",whiteSpace:"pre-line"}}>"{ex[tier]}"</p>
      </div>
      <div style={{background:"#FEF2F2",borderLeft:`3px solid ${RED}`,borderRadius:8,padding:12,marginBottom:16}}>
        <p style={{color:RED,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 4px"}}>Coach commentary</p>
        <p style={{color:"#991B1B",fontSize:13,lineHeight:1.65,margin:0}}>{ex.why}</p>
      </div>
    </div>
  );
}

const INTERVIEW_QS=[
  {q:"Why do you want to work in motor vehicle?",tip:"Do not say you love cars. Connect genuine interest to something specific about the work, the technology or the employer.",weak:"I have always loved cars and I enjoy working with my hands. I think motor vehicle is a great career with good job prospects and I am excited about the apprenticeship.",strong:"I want to work in motor vehicle because I find the combination of mechanical and electronic systems genuinely compelling — particularly as vehicles become more complex with electrification and ADAS. I have spent the last two years working on a Honda Civic alongside my uncle and what I find most satisfying is the diagnostic aspect — the systematic process of identifying a fault when the cause is not immediately obvious. I am specifically applying to Arnold Clark's BMW programme because BMW is a leader in electric vehicle technology and the manufacturer master technician pathway is exactly the kind of structured progression I want to pursue."},
  {q:"What do you know about electric vehicles and how they work?",tip:"This is the single most differentiating question in motor vehicle right now. Most candidates know nothing specific. Any genuine knowledge puts you ahead.",weak:"I know electric vehicles use a battery instead of a petrol engine. They are better for the environment and they are getting more popular. I am interested in learning about them.",strong:"Electric vehicles use an electric motor powered by a high-voltage battery pack — typically 300–800V DC — rather than an internal combustion engine. The motor converts electrical energy directly into rotational force, which is why EVs have instant torque from standstill. The battery management system monitors every cell's voltage, temperature and state of charge. Regenerative braking recovers kinetic energy when decelerating and returns it to the battery.\n\nFrom a safety perspective, working on high-voltage systems requires specific qualification — the IMI EV framework goes from Level 1 awareness to Level 4 specialist. I have completed IMI Level 1 EV Awareness. I understand that HV systems must be properly de-energised and isolated before any work begins, and that the system must be verified as isolated using an approved voltage tester.\n\nI am also aware that modern EVs increasingly include ADAS systems that require calibration after certain repairs. This is an area I am particularly interested in developing expertise in."},
  {q:"What safety regulations are relevant to a motor vehicle workshop?",tip:"Name specific regulations. Do not give the generic 'safety is important' answer that every other candidate gives.",weak:"There are lots of health and safety rules in a workshop. You need to wear the right PPE like gloves and safety glasses. You need to follow the rules and make sure the workshop is safe.",strong:"Three regulations are particularly relevant to a motor vehicle workshop:\n\nCOSHH — Control of Substances Hazardous to Health — requires hazardous substances to be identified and controlled. In a workshop this covers engine oil, brake fluid, brake cleaner, battery acid, refrigerants, welding fumes and asbestos in older components.\n\nLOLER — Lifting Operations and Lifting Equipment Regulations — requires all lifting equipment to be inspected by a competent person, vehicle lifts every six months. Safe working loads must be clearly marked and never exceeded. Vehicles must be positioned correctly on manufacturer-specified jacking points before lifting.\n\nPUWER — Provision and Use of Work Equipment Regulations — requires that all workshop tools and machinery are suitable for their purpose, maintained safely and only used by people who have been trained on them.\n\nIn addition, EV high-voltage work requires specific IMI-level qualification — it is not covered by standard workshop safety training."},
  {q:"What is the minimum legal tyre tread depth and how would you check it?",tip:"A direct knowledge question. State the number confidently. Describe the checking method specifically.",weak:"The minimum tread depth is 1.6 millimetres. You can check it with a gauge or there are also indicators in the tyre itself.",strong:"The minimum legal tyre tread depth in the UK is 1.6mm across the central three-quarters of the tread, around the entire circumference. The penalty for driving on illegal tyres is up to £2,500 and 3 penalty points per tyre.\n\nThe professional method to check is a tread depth gauge — insert it into the tread groove and read the measurement directly. Every technician should have one.\n\nThere is also the 20p test: insert a 20p coin into the tread groove. If the outer band of the coin is visible, the tread is below the legal minimum.\n\nTyres also have tread wear indicators — small raised sections moulded into the tyre at 1.6mm depth. When the tread surface is level with the indicator, the tyre has reached the legal limit.\n\nIn practice, most technicians recommend replacement at 3mm — well above the legal limit — because wet stopping distances increase significantly below 3mm."},
  {q:"Tell me about a technical problem you solved.",tip:"Use the full STAR structure. Show systematic thinking — not just that you fixed it.",weak:"I fixed the brakes on my car. They were making a noise so I changed the pads and it stopped. It was not too difficult and I learned how to do it properly.",strong:"My uncle's Transit van had an intermittent starting fault — mainly on cold mornings. Rather than guess, I started by asking him to describe exactly when it occurred and then connected an OBD scanner. There was a stored fault code P0335 — crankshaft position sensor circuit malfunction.\n\nI researched what the sensor does — it sends a timing signal to the ECU for ignition. An intermittent open circuit in that sensor would cause exactly the cold-start fault. I traced the wiring from the sensor back towards the ECU and found a section of loom with cracked insulation near the exhaust manifold — thermal cycling was causing intermittent contact loss in cold temperatures.\n\nI repaired the wiring, cleared the code and the van has started reliably since. Two other garages had not found the fault in over a year.\n\nWhat I took from it: the fault code is a starting point, not a diagnosis. Understanding why the fault code exists tells you what to look for — not what the fault is."},
  {q:"What questions do you have for us?",tip:"Never say none. Motor vehicle interviewers look for genuine curiosity about the training programme, the technology and the progression pathway.",weak:"No, I think you have covered everything. Thank you very much for your time.",strong:"I have three questions. First — I know this dealership represents BMW, which has a strong EV portfolio with the iX and i4. What does the manufacturer EV training look like for apprentices and at what point in the programme would I begin working on high-voltage systems under supervision? Second — what does the path from apprentice to BMW master technician look like in terms of timeline and what additional qualifications are involved? Third — I noticed in your workshop you have [specific equipment/vehicle seen during the visit] — could you tell me more about how apprentices get exposure to that kind of work?"},
];

function InterviewModule(){
  const [current,setCurrent]=useState(0);
  const [reveal,setReveal]=useState(null);
  const q=INTERVIEW_QS[current];
  return (
    <div>
      <PageHeader icon="🎤" title="Interview Preparation" subtitle="Motor vehicle-specific technical and competency questions — with model answers."/>
      <InfoBox text="Motor vehicle interviewers test technical knowledge directly. If you cannot state the minimum tyre tread depth, explain what OBD is or name the three key workshop safety regulations, you are not prepared." type="warning"/>
      <NavTabBar options={INTERVIEW_QS.map((_,i)=>({id:i,label:`Q${i+1}`}))} active={current} onSelect={(id)=>{setCurrent(id);setReveal(null);}}/>
      <Card>
        <p style={{color:MID,fontSize:11,textTransform:"uppercase",margin:"0 0 5px"}}>Interview question</p>
        <p style={{color:NAVY,fontWeight:800,fontSize:15,margin:"0 0 12px"}}>"{q.q}"</p>
        <div style={{background:"#FEF2F2",borderLeft:`3px solid ${RED}`,borderRadius:8,padding:"9px 11px"}}>
          <p style={{color:"#991B1B",fontSize:13,lineHeight:1.6,margin:0}}>💡 <strong>Coach tip:</strong> {q.tip}</p>
        </div>
      </Card>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <button onClick={()=>setReveal(reveal==="strong"?null:"strong")} style={{flex:1,padding:10,background:reveal==="strong"?GREEN:WHITE,border:`2px solid ${GREEN}`,color:reveal==="strong"?WHITE:GREEN,borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>{reveal==="strong"?"Hide":"✓ Strong"}</button>
        <button onClick={()=>setReveal(reveal==="weak"?null:"weak")} style={{flex:1,padding:10,background:reveal==="weak"?RUST:WHITE,border:`2px solid ${RUST}`,color:reveal==="weak"?WHITE:RUST,borderRadius:8,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase"}}>{reveal==="weak"?"Hide":"✗ Weak"}</button>
      </div>
      {reveal==="strong"&&<div style={{background:"#F0FDF4",borderLeft:`3px solid ${GREEN}`,borderRadius:10,padding:14,marginBottom:12}}><p style={{color:GREEN,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 8px"}}>Strong Answer</p><p style={{color:"#14532D",fontSize:14,lineHeight:1.7,margin:0,whiteSpace:"pre-line"}}>{q.strong}</p></div>}
      {reveal==="weak"&&<div style={{background:"#FEF2F2",borderLeft:`3px solid ${RUST}`,borderRadius:10,padding:14,marginBottom:12}}><p style={{color:RUST,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 8px"}}>Weak Answer</p><p style={{color:"#7F1D1D",fontSize:14,lineHeight:1.7,margin:0}}>{q.weak}</p></div>}
      <Card>
        <p style={{color:TEAL,fontWeight:700,fontSize:12,margin:"0 0 8px",textTransform:"uppercase"}}>🎤 Practise your answer</p>
        <textarea placeholder="Type your answer here..." rows={4} style={{width:"100%",background:GREY,border:"1px solid #E2E8F0",borderRadius:8,padding:12,color:NAVY,fontSize:13,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
        <p style={{color:MID,fontSize:12,marginTop:8,marginBottom:0}}>💡 Paste into the AI Coach for detailed feedback.</p>
      </Card>
    </div>
  );
}

function ReadyModule(){
  const [scores,setScores]=useState({});
  const questions=[
    {id:"mechanical",label:"Mechanical aptitude",q:"I have a genuine interest in how mechanical things work — I find myself wanting to understand why things work, not just that they do.",options:["Yes — I have always been curious about mechanical systems and have evidence of this","Mostly — I am interested but have limited hands-on experience so far","Somewhat — I am more interested in the career than the mechanics specifically","No — I am applying mainly because it seems like a practical option"]},
    {id:"physical",label:"Physical demands",q:"I can work in a physically demanding environment — standing for long periods, working in confined spaces, lifting heavy components, working in heat and cold.",options:["Yes — I am physically fit and comfortable with this type of work","Probably — I am reasonably fit and will adapt","I am uncertain — I have not been tested in this kind of environment","No — physical demanding work over a full shift sounds difficult"]},
    {id:"precision",label:"Attention to detail",q:"I naturally work precisely — I check my work, follow procedures correctly and do not cut corners even when under time pressure.",options:["Yes — precision is something I apply consistently and others have commented on it","Mostly — I am careful but sometimes rush when under pressure","Sometimes — I can become less precise when I am busy or stressed","No — I am generally more focused on getting things done than on doing them perfectly"]},
    {id:"ev",label:"EV awareness",q:"I am genuinely interested in electric vehicle technology and motivated to develop expertise in high-voltage systems as part of my career.",options:["Yes — I have already started researching EVs and I find the technology genuinely interesting","Mostly — I accept it is important and I am willing to learn about it","Somewhat — I am more interested in traditional mechanics than electronics","No — I am not particularly interested in the EV side of modern vehicles"]},
    {id:"diagnosis",label:"Problem solving",q:"When something does not work, I naturally want to understand why — not just fix the symptom but find the root cause.",options:["Yes — systematic problem-solving is something I genuinely enjoy","Mostly — I try to find the cause but sometimes settle for a fix that works","Sometimes — I prefer to find a solution quickly rather than understand it fully","No — I find fault diagnosis frustrating and prefer clear, defined tasks"]},
    {id:"commitment",label:"Long-term commitment",q:"I am prepared to commit to 2–4 years of a structured apprenticeship — college attendance, assessments and structured learning alongside work.",options:["Yes — I have researched the commitment and I am fully prepared for it","Probably — I am motivated but have some uncertainty about the full duration","I am uncertain — the structured learning element concerns me somewhat","No — 2–4 years of structured training alongside work feels too demanding"]},
  ];
  const totalAnswered=Object.keys(scores).length;
  const totalScore=Object.values(scores).reduce((a,b)=>a+b,0);
  const maxScore=questions.length*3;
  const pct=totalAnswered===questions.length?Math.round((totalScore/maxScore)*100):null;
  function getVerdict(){
    if(pct===null)return null;
    if(pct>=80)return{label:"Strong candidate",color:GREEN,text:"Your responses suggest you have the mechanical curiosity, precision, EV awareness and commitment that motor vehicle employers are looking for right now. You are well-suited to apply. Focus your preparation on the Technical Knowledge and EV tabs — and complete the free IMI EV Awareness Level 1 before your interview."};
    if(pct>=60)return{label:"Ready with preparation",color:TEAL,text:"You have the foundations but some areas need attention before you apply. Look honestly at your weaker responses — particularly around EV interest and attention to detail. The EV transition means that candidates who embrace electrification will significantly outperform those who do not. The Technical Knowledge tab will help you build the knowledge base you need."};
    if(pct>=40)return{label:"Build your foundation first",color:AMBER,text:"Your responses suggest some gaps in either mechanical aptitude, EV awareness or commitment to the precision that motor vehicle work requires. Consider building more hands-on experience first — volunteering at a local garage, taking an evening engineering course, or working through the free EV learning resources in the EV tab. Coming back to apply with six months of deliberate preparation will significantly improve your chances."};
    return{label:"Reconsider your pathway",color:RUST,text:"Based on your responses, a motor vehicle apprenticeship may not be the best fit right now. The combination of physical demands, diagnostic precision and the accelerating requirement for EV expertise means this is an increasingly demanding career path. Consider whether there is a different technical pathway that better aligns with your genuine strengths and interests."};
  }
  const verdict=getVerdict();
  return (
    <div>
      <PageHeader icon="✅" title="Am I Ready for Motor Vehicle?" subtitle="An honest self-assessment — motor vehicle is more technically demanding than most people realise. Answer truthfully."/>
      <InfoBox text="Modern vehicles are computers on wheels. The days of purely mechanical work are over. Every motor vehicle technician now needs electrical diagnostic skills and increasingly EV-specific knowledge. Make sure you are genuinely ready for that." type="warning"/>
      {questions.map((q)=>(
        <Card key={q.id}>
          <p style={{color:RED,fontSize:11,fontWeight:700,textTransform:"uppercase",margin:"0 0 4px"}}>{q.label}</p>
          <p style={{color:NAVY,fontWeight:700,fontSize:14,margin:"0 0 12px",lineHeight:1.4}}>{q.q}</p>
          {q.options.map((opt,j)=>(
            <button key={j} onClick={()=>setScores(s=>({...s,[q.id]:3-j}))} style={{width:"100%",display:"flex",alignItems:"center",gap:10,background:scores[q.id]===3-j?RED+"15":WHITE,border:`1px solid ${scores[q.id]===3-j?RED:"#E2E8F0"}`,borderRadius:8,padding:"10px 12px",marginBottom:6,cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
              <div style={{width:16,height:16,borderRadius:99,border:`2px solid ${scores[q.id]===3-j?RED:"#CBD5E1"}`,background:scores[q.id]===3-j?RED:WHITE,flexShrink:0}}/>
              <span style={{color:scores[q.id]===3-j?RED:NAVY,fontSize:13,lineHeight:1.4}}>{opt}</span>
            </button>
          ))}
        </Card>
      ))}
      {totalAnswered===questions.length&&verdict&&(
        <Card style={{borderLeft:`4px solid ${verdict.color}`,background:verdict.color+"12"}}>
          <p style={{color:verdict.color,fontWeight:800,fontSize:15,margin:"0 0 8px"}}>{verdict.label}</p>
          <p style={{color:"#333",fontSize:14,lineHeight:1.7,margin:0}}>{verdict.text}</p>
        </Card>
      )}
      {totalAnswered<questions.length&&(
        <div style={{background:GREY,borderRadius:10,padding:14,textAlign:"center"}}>
          <p style={{color:MID,fontSize:13,margin:0}}>Answer all {questions.length} questions to see your result — {totalAnswered}/{questions.length} answered</p>
        </div>
      )}
    </div>
  );
}

function CoachModule(){
  const [messages,setMessages]=useState([{role:"assistant",content:"I am your TASS Motor Vehicle Apprenticeship Coach.\n\nI can help you with:\n• Mock interviews — technical and competency questions across all motor vehicle pathways\n• CV feedback — paste your draft and I will review it section by section\n• Technical knowledge — COSHH, LOLER, PUWER, OBD diagnostics, MOT, tyre law\n• EV and hybrid technology — high voltage safety, battery systems, ADAS\n• STAR answer building — share a real experience and I will help you structure it\n• Employer research — Arnold Clark, Kwik Fit, Macklin Motors, John Clark, Lookers, Stagecoach\n• MyJobScotland supporting statements for public sector fleet roles\n• IMI EV qualification guidance — which level to target and how to access it\n\nWhat would you like to work on?"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  const PROMPTS=["Run a mock motor vehicle interview","Give feedback on my CV","Quiz me on workshop safety regulations","Help me build a STAR answer about a diagnostic problem","What should I know about Arnold Clark?","Tell me about EV high voltage safety"];

  async function send(){
    if(!input.trim()||loading)return;
    const userMsg=input.trim(); setInput("");
    const newMsgs=[...messages,{role:"user",content:userMsg}];
    setMessages(newMsgs); setLoading(true);
    try{
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-5-20250929",max_tokens:1000,
        system:`You are the TASS Motor Vehicle Apprenticeship Coach — a direct, knowledgeable careers coach helping young people (16–29) and career changers in Scotland secure Motor Vehicle Modern Apprenticeships at SCQF Levels 5, 6 and 7.

Your approach:
- Direct and specific — no vague encouragement. Give actual next steps.
- Scotland-specific: you know Scotland's motor vehicle sector thoroughly — Arnold Clark (Scotland's largest private company, 200+ sites, Arnold Clark University apprenticeship programme), Kwik Fit (founded Edinburgh 1971, 150+ Scottish centres), Macklin Motors (Scottish dealer group, Nissan/Renault/Fiat/Alfa Romeo), John Clark Motor Group (Edinburgh/Aberdeen, BMW/MINI/JLR/Volvo), Lookers (Ford/Vauxhall/VW/Audi), Stagecoach (Perth HQ, heavy vehicle EV buses), FirstGroup (electric bus fleet).
- Public sector knowledge: City of Edinburgh Council fleet, Glasgow City Council fleet, NHS Scotland fleet, Police Scotland fleet, Scottish Ambulance Service, Scottish Fire and Rescue.
- All 9 pathways: light vehicle, heavy vehicle (HGV/PSV), body repair, vehicle paintwork, MET technician, vehicle parts, fast-fit, motorcycle, land-based engineering.
- Technical knowledge: COSHH (hazardous substances in workshop), LOLER (lifting equipment — 6-monthly inspection for vehicle lifts), PUWER (work equipment regulations), OBD/OBD2 diagnostics (fault codes, P/B/C/U codes), MOT (what it covers, 3 outcomes), minimum tyre tread depth (1.6mm, 20p test, tread wear indicators), VIN number structure.
- EV and hybrid expertise: high voltage safety (300-800V DC), IMI EV qualification levels (1-4), de-energisation procedure, insulated PPE requirements, electric motor types (AC induction, permanent magnet synchronous), battery technology (lithium-ion, NMC/LFP/NCA, BMS, SoC, SoH, degradation factors), ADAS systems and calibration requirements after certain repairs.
- Recruitment cycles: August intake (apply Oct-Jan), January intake (apply Aug-Oct), manufacturer academies (BMW Group, VW Group Academy, Ford EMEA), Arnold Clark University rolling intake.

When running mock interviews:
- Ask one question at a time — mix technical (safety regulations, OBD, tyre depth, EV) and competency questions
- Technical questions must be answered with specifics — not just 'safety is important'
- After each answer: what was strong, what was missing, then show an improved version

When reviewing CVs:
- Check for: specific employer named, specific pathway named, any hands-on mechanical experience, IMI EV Awareness Level 1 if completed, relevant subjects (Maths, Engineering Science, Physics), driving licence if held
- Motor vehicle CVs must show mechanical curiosity — home projects, school workshop, agricultural machinery, anything hands-on

Key things to reinforce:
- IMI EV Awareness Level 1 is free and completing it before interview is a genuine differentiator
- The three key workshop safety regulations: COSHH, LOLER, PUWER — candidates who name all three stand out
- A fault code is not a diagnosis — it is a starting point for systematic investigation
- Arnold Clark University is one of the best automotive apprenticeship programmes in the UK
- Scotland's 2030 EV target makes EV knowledge increasingly non-optional

Keep responses mobile-friendly. Use short paragraphs and bullet points.`,
        messages:newMsgs.map(m=>({role:m.role,content:m.content}))
      })});
      const data=await res.json();
      const reply=data.content?.[0]?.text||"Connection issue — please try again.";
      setMessages([...newMsgs,{role:"assistant",content:reply}]);
    }catch(error){setMessages([...newMsgs,{role:"assistant",content:`Connection issue — please try again. (${error.message})`}]);}
    setLoading(false);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 180px)",minHeight:480}}>
      <div style={{background:"#FEF2F2",borderLeft:`3px solid ${RED}`,borderRadius:8,padding:"9px 13px",marginBottom:10}}>
        <p style={{color:"#991B1B",fontSize:13,margin:0}}>💡 Ask anything — mock interviews, CV feedback, technical knowledge, EV systems or employer research. Be specific for the best results.</p>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
        {PROMPTS.map((p,i)=><button key={i} onClick={()=>setInput(p)} style={{background:RED+"15",border:`1px solid ${RED}40`,color:RED,borderRadius:99,padding:"5px 11px",whiteSpace:"nowrap",fontSize:11,fontWeight:600,cursor:"pointer",flexShrink:0,fontFamily:"inherit"}}>{p}</button>)}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingRight:4,paddingBottom:8}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"88%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?NAVY:WHITE,color:m.role==="user"?WHITE:NAVY,fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",border:m.role==="assistant"?"1px solid #E2E8F0":"none",boxShadow:m.role==="assistant"?"0 1px 4px rgba(0,0,0,0.06)":"none"}}>{m.content}</div>
          </div>
        ))}
        {loading&&<div style={{display:"flex",justifyContent:"flex-start"}}><div style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:"14px 14px 14px 4px",padding:"11px 15px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}><div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,background:TEAL,borderRadius:99,animation:`b 1.2s ${i*0.2}s infinite`}}/>)}</div></div></div>}
        <div ref={bottomRef}/>
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask your coach anything..." rows={3} style={{flex:1,background:WHITE,border:"1px solid #E2E8F0",borderRadius:10,padding:"10px 13px",color:NAVY,fontSize:13,fontFamily:"inherit",resize:"none",minHeight:60,boxSizing:"border-box",lineHeight:1.65}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{background:input.trim()?TEAL:"#E2E8F0",border:"none",color:input.trim()?WHITE:"#999",borderRadius:10,padding:"0 16px",cursor:input.trim()?"pointer":"default",fontSize:20}}>↑</button>
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

export default function TASSMotorVehicle(){
  const [tab,setTab]=useState("home");
  const current=TABS.find(t=>t.id===tab);
  return (
    <div style={{fontFamily:"'Segoe UI', system-ui, sans-serif",background:GREY,minHeight:"100vh",color:NAVY}}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${GREY}; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; } textarea:focus, button:focus { outline: 2px solid ${TEAL}; outline-offset: 2px; }`}</style>
      {tab!=="home"&&(
        <div style={{background:`linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
          <TASSLogo size="sm" theme="dark"/>
          <div style={{width:1,height:32,background:"rgba(255,255,255,0.15)",margin:"0 4px"}}/>
          <div style={{flex:1}}>
            <div style={{color:"rgba(255,255,255,0.6)",fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.5}}>Motor Vehicle</div>
            <div style={{color:WHITE,fontSize:13,fontWeight:700,marginTop:2}}>{current?.icon} {current?.label}</div>
          </div>
        </div>
      )}
      <div style={{maxWidth:640,margin:"0 auto",padding:"20px 16px 110px"}}>
        {tab==="home"      &&<HomeModule setTab={setTab}/>}
        {tab==="sector"    &&<SectorModule/>}
        {tab==="pathways"  &&<PathwaysModule/>}
        {tab==="technical" &&<TechnicalModule/>}
        {tab==="ev"        &&<EVModule/>}
        {tab==="employers" &&<EmployersModule/>}
        {tab==="cycles"    &&<CyclesModule/>}
        {tab==="mjs"       &&<MJSModule/>}
        {tab==="cv"        &&<CVModule/>}
        {tab==="star"      &&<STARModule/>}
        {tab==="interview" &&<InterviewModule/>}
        {tab==="ready"     &&<ReadyModule/>}
        {tab==="coach"     &&<CoachModule/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:WHITE,borderTop:"1px solid #E2E8F0",display:"flex",justifyContent:"center",padding:"8px 2px 12px",zIndex:100,boxShadow:"0 -2px 12px rgba(0,0,0,0.06)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,maxWidth:42,background:"none",border:"none",cursor:"pointer",padding:"5px 2px",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{fontSize:11,filter:tab===t.id?"none":"grayscale(1) opacity(0.3)"}}>{t.icon}</div>
            <div style={{fontSize:6,color:tab===t.id?TEAL:"#999",fontWeight:tab===t.id?800:400,textTransform:"uppercase",letterSpacing:"0.02em"}}>{t.label.substring(0,4)}</div>
            {tab===t.id&&<div style={{width:12,height:2,background:TEAL,borderRadius:2}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
