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
				expect(els.length).toBe(1);
				expect(els[0].className).toBe('hello');
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
				expect(els.length).toBe(1);
				expect(els[0].className).toBe('hello');
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
	describe('Multiple elements exist and add multiple elements', function() {
		beforeEach(function() {
			document.innerHTML = window.__html__['test/fixtures/multiElement.html'];
		});
		it('Add 2 elements', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/multiElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				expect(els.length).toBe(2);
				var helloCount = 0, otherHelloCount = 0;
				for(var i = 0; i < els.length; i++) {
					if(els[i].className.match(/hello/)) {
						helloCount++;
					}
					if(els[i].className.match(/other/)) {
						otherHelloCount++;
					}
				}
				expect(helloCount).toBe(2);
				expect(otherHelloCount).toBe(1);
			})
		});
		it('Add 6 elements', function() {
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/multiElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/multiElement.html'];
					document.body.innerHTML +=  window.__html__['test/fixtures/multiElement.html'];
				}, 100);
			});
			waitsFor(function() {
				return !!els;
			});
			runs(function() {
				expect(els.length).toBe(6);
				var helloCount = 0, otherHelloCount = 0;
				for(var i = 0; i < els.length; i++) {
					if(els[i].className.match(/hello/)) {
						helloCount++;
					}
					if(els[i].className.match(/other/)) {
						otherHelloCount++;
					}
				}
				expect(helloCount).toBe(6);
				expect(otherHelloCount).toBe(3);
			})
		});
		it('Add 6 elements in succession, 2 at a time', function() {
			var done = 0;
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					els = elements;
					expect(els.length).toBe(2);
					var helloCount = 0, otherHelloCount = 0;
					for(var i = 0; i < els.length; i++) {
						if(els[i].className.match(/hello/)) {
							helloCount++;
						}
						if(els[i].className.match(/other/)) {
							otherHelloCount++;
						}
					}
					expect(helloCount).toBe(2);
					expect(otherHelloCount).toBe(1);
					done++;
					if(done < 3) {
						var div = document.createElement('div');
						div.innerHTML = window.__html__['test/fixtures/multiElement.html']
						document.body.appendChild(div);
					}
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/multiElement.html'];
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
		it('Multiple elements add none', function() {
			var called;
			runs(function() {
				destroy = onNodesInserted('.hello', function(elements) {
					called = true;
				});
				setTimeout(function() {
					document.body.innerHTML +=  window.__html__['test/fixtures/multiNoClass.html'];
				}, 100);
				setTimeout(function() {
					if(!called) {
						called = false;
					}
				}, 1000);
			});
			waitsFor(function() {
				return called === false;
			});
			runs(function() {
				expect(true).toBe(true);
			})
		});
	});
});
