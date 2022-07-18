build =

serve: $(build)
	darkhttpd .

# FIXME wkhtmltopdf renders less nicely than firefox
gw.pdf: resume.html style.css Makefile
	wkhtmltopdf\
		--page-size letter\
	 	--enable-local-file-access\
	 	--no-background\
	 	$< $@
	
.PHONY: serve build
