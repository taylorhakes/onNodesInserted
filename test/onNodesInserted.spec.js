describe('onNodesInserted', function() {
	var els, destroy;
	beforeEach(function() {
		els = null;
		document.body.innerHTML = '';
	});
	afterEach(function() {
		destroy.destroy();
	})
	describe('no elements', function() {
		it('Add 1 element', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				for(var i = 0; i < els.length; i++) {
					expect(els[i].className).toBe('hello');
				}
			})
		});
		it('Add 3 elements', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				expect(els.length).toBe(3);
				expect(els[0].className).toBe('hello');
				expect(els[1].className).toBe('hello');
				expect(els[2].className).toBe('hello');
			})
		});
		it('Add 3 elements in succession', function() {
			var done = 0;
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
					expect(els.length).toBe(1);
					expect(els[0].className).toBe('hello');
					done++;
					if(done < 3) {
						var div = document.createElement('div');
						div.innerHTML = window.__html__['test/fixtures/oneElement.html']
						document.body.appendChild(div);
					}
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return done === 3;
			});
			runs(function() {
				expect(true).toBe(true);
			})
		});
	});
	describe('Multiple elements exist', function() {
		beforeEach(function() {
			document.innerHTML = window.__html__['test/fixtures/multiElement.html'];
		});
		it('Add 1 element', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				for(var i = 0; i < els.length; i++) {

					expect(els[i].className).toBe('hello');
				}
			})
		});
		it('Add 3 elements', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				expect(els.length).toBe(3);
				expect(els[0].className).toBe('hello');
				expect(els[1].className).toBe('hello');
				expect(els[2].className).toBe('hello');
			})
		});
		it('Add 3 elements in succession', function() {
			var done = 0;
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
					expect(els.length).toBe(1);
					expect(els[0].className).toBe('hello');
					done++;
					if(done < 3) {
						var div = document.createElement('div');
						div.innerHTML = window.__html__['test/fixtures/oneElement.html']
						document.body.appendChild(div);
					}
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/oneElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return done === 3;
			});
			runs(function() {
				expect(true).toBe(true);
			})
		});
	});
});
