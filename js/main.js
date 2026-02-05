document.addEventListener('DOMContentLoaded',function(){
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();
  var toggle=document.getElementById('nav-toggle');
  var nav=document.getElementById('site-nav');
  if(toggle && nav){
    toggle.addEventListener('click',function(){nav.classList.toggle('open')});
  }

  var downloadBtn = document.getElementById('download-pdf');
  if(downloadBtn){
    downloadBtn.addEventListener('click', async function(){
      var el = document.getElementById('resume-content');
      if(!el) return;
      try{
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p','pt','a4');
        await pdf.html(el, {
          callback: function(doc){ doc.save('Payton_Irvin_Resume.pdf'); },
          x: 10,
          y: 10,
          html2canvas: { scale: 2, useCORS: true }
        });
      }catch(e){
        console.error('PDF generation failed', e);
        alert('Unable to generate PDF in this browser. You can print to PDF from the page instead.');
      }
    });
  }
});
