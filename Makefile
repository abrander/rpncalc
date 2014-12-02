TARGETS = \
	app/js/compiled.js \
	app/index.html \
	app/robots.txt \

EXTERNS = \
	externs/angular-1.3-q.js \
	externs/angular-1.3-http-promise.js \
	externs/angular-1.3.js \

SOURCES = \
	js/app.js \
	js/button.js \
	js/calculator.js \
	js/stackoperation.js \

all: $(TARGETS)

clean:
	rm -rf $(TARGETS)
	rm -rf app
	rm -rf externs
	rm -f compiler.jar
	rm -f compiler-latest.zip

externs/%:
	mkdir -p externs
	wget -O $@ -N -q https://raw.githubusercontent.com/google/closure-compiler/master/contrib/$@

app/index.html: index.html
	cp $< $@

app/robots.txt: Makefile
	> $@

app/js/compiled.js: compiler.jar $(SOURCES) $(EXTERNS)
	mkdir -p app/js
	java -jar compiler.jar \
	--js_output_file $@ \
	--angular_pass \
	--externs $(EXTERNS) \
	--js $(SOURCES) \
	--warning_level VERBOSE \
	--jscomp_error suspiciousCode \
	--jscomp_error reportUnknownTypes \
	--compilation_level ADVANCED \
	--language_in ECMASCRIPT5_STRICT \
	--formatting SINGLE_QUOTES \
	--summary_detail_level 3 \

update-compiler: remove-compiler compiler.jar

remove-compiler:
	rm -f compiler-latest.zip

compiler-latest.zip:
	wget -O $@ -N -q http://dl.google.com/closure-compiler/compiler-latest.zip

compiler.jar: compiler-latest.zip
	unzip -q compiler-latest.zip compiler.jar
	touch $@ -r $<

update-externs: remove-externs $(EXTERNS)

remove-externs:
	rm -f $(EXTERNS)

deploy: google-app-engine.yaml $(TARGETS)
	mkdir -p app
	cp $< app/
	gcloud preview app --project rpncalcorg deploy app

lint: jscs gjslint

jscs:
	jscs -v $(SOURCES)

gjslint:
	gjslint --disable=5,210 $(SOURCES)
